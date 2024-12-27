import { syntaxTree } from '@codemirror/language';
import { RangeSetBuilder, StateEffect, StateField } from "@codemirror/state";
import { Decoration, EditorView, WidgetType } from "@codemirror/view";

const toggleHorizontalRuleEffect = StateEffect.define();

const horizontalRuleField = StateField.define({
    create() {
        return Decoration.none;
    },
    update(decorations, transaction) {
        decorations = decorations.map(transaction.changes);
        for (let effect of transaction.effects) {
            if (effect.is(toggleHorizontalRuleEffect)) {
                decorations = effect.value;
            }
        }
        return decorations;
    },
    provide: field => EditorView.decorations.from(field)
})

function createHorizontalLineDecorations(view) {
    const builder = new RangeSetBuilder();
    const { from, to } = view.state.selection.main;
    let lastYAMLMark = 0;

    syntaxTree(view.state).iterate({
        enter: (node) => {
            if (node.name === 'FrontmatterMark') {
                lastYAMLMark = node.from;
            }
            if (node.name === 'HorizontalRule' && lastYAMLMark != node.from) {
                const isActive = from >= node.from && to <= node.to;

                if (!isActive) {
                    builder.add(node.from, node.to, Decoration.widget({
                        widget: new HorizontalRuleWidget(),
                        block: false
                    }))
                }
            }
        }
    });

    return builder.finish();
}

function toggleHorizontalRuleVisibility(view) {
    view.dispatch({
        effects: toggleHorizontalRuleEffect.of(createHorizontalLineDecorations(view))
    });
}


class HorizontalRuleWidget extends WidgetType {
    constructor() {
        super();
    }

    toDOM(view) {
        const container = document.createElement('div');
        container.className = 'cm-horizontal-rule-widget-container';

        const hr = document.createElement('hr');
        hr.className = 'cm-horizontal-rule-widget';

        container.appendChild(hr);

        return container;
    }
}

export const HorizontalRuleExtension = [
    horizontalRuleField,
    EditorView.updateListener.of((update) => {
        if (update.selectionSet){
            toggleHorizontalRuleVisibility(update.view);
        }
    })
]