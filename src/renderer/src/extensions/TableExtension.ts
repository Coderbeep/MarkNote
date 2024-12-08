import { syntaxTree } from '@codemirror/language';
import { RangeSetBuilder, StateEffect, StateField } from "@codemirror/state";
import { Decoration, EditorView, WidgetType } from "@codemirror/view";
import markdoc from '@markdoc/markdoc';

const toggleTableEffect = StateEffect.define();

const tableField = StateField.define({
    create() {
        return Decoration.none;
    },
    update(decorations, transaction) {
        decorations = decorations.map(transaction.changes);
        for (let effect of transaction.effects) {
            if (effect.is(toggleTableEffect)) {
                decorations = effect.value;
            }
        }
        return decorations;
    },
    provide: field => EditorView.decorations.from(field)
})


function createTableDecorations(view) {
    const builder = new RangeSetBuilder();
    const { from, to } = view.state.selection.main;

    syntaxTree(view.state).iterate({
        enter: (node) => { 
          if (node.name === 'Table') {
            const isActive = from >= node.from && to <= node.to;
            if (!isActive) {
              builder.add(node.from, node.to, Decoration.widget({
                widget: new TableWidget(view.state.sliceDoc(node.from, node.to)),
                block: true,
                side: 1
              }))
            }
          }
        }
    });
    return builder.finish();
}

function toggleTableVisibility(view) {
    view.dispatch({
        effects: toggleTableEffect.of(createTableDecorations(view))
    });
}


class TableWidget extends WidgetType {
  constructor(public source: string) {
    super();
    this.source = source;
  }

  toDOM(view: EditorView) {
    const container = document.createElement('div');
    container.className = 'cm-table-widget';

    const doc = markdoc.parse(this.source);
    const transformed = markdoc.transform(doc);
    const rendered = markdoc.renderers.html(transformed);

    container.innerHTML = rendered;

    const table = container.querySelector('table');
    const cells = table.querySelectorAll('td');


    cells.forEach((cell) => {
      cell.setAttribute('contenteditable', 'true');

      cell.addEventListener('input', (e) =>  this.handleCellInput(e, cell, view));
    })

    return container;
  }

  handleCellInput(e, cell, view) {
    const content = cell.innerText;
    console.log(content);

  }
}

export const TableExtension = [
    tableField,
    EditorView.updateListener.of((update) => {
        if (update.selectionSet){
            toggleTableVisibility(update.view);
        }
    })
]