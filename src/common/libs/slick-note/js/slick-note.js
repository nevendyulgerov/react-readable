
/**
 * Plugin: Slick Note
 * v1.0.0
 * Standard: ECMAScript 2015
 * Author: Neven Dyulgerov
 * License: Released under the MIT license
 *
 * Description: Provides notification functionality
 */

import ammo from '../../ammo';
import '../css/slick-note.css';

const slickNote = ammo.app().schema('default');

slickNote.configure('renderers')
  .node('append', noteHtml => {
    const app = ammo.select('.component.app').get();
    let noteContainer = ammo.select('.slick-note-container').get();

    if ( ! noteContainer ) {
      ammo.appendAfter('<div class="slick-note-container"></div>', app);
    }

    noteContainer = ammo.select('.slick-note-container').get();
    ammo.appendBefore(noteHtml, noteContainer);

    return ammo.selectAll('.slick-note').filter(':last-child').get()[0];
  })
  .node('remove', note => {
    if ( note ) {
      ammo.removeEl(note);
    }
  });

slickNote.configure('actions')
  .node('createNoteHtml', options => {
    let template = `
      <div class="slick-note" data-type="{type}">
        <div class="note-header">
          <div class="title">
            <h2>{title}</h2>
          </div>
        </div>
        <div class="note-body">
          <div class="note-content">{content}</div>
        </div>
        {noteFooter}
      </div>
    `;

    template = template.replace('{noteFooter}', options.isConfirm ? `<div class="note-footer">
          <button class="trigger cancel">{cancelText}</button>
          <button class="trigger confirm">{confirmText}</button></div>` : '');

    return template
      .replace('{type}', `${options.type}`)
      .replace('{title}', options.title)
      .replace('{content}', options.content)
      .replace('{cancelText}', options.cancelText)
      .replace('{confirmText}', options.confirmText);
  })
  .node('init', options => {
    if ( ! ammo.isObj(options) ) {
      return new Error('[slickNote] Invalid initialization. Provide a valid options object at initialization.');
    }
    const { renderers, actions } = slickNote.getNodes();
    const title = options.title || 'Info';
    const content = options.content || '';
    const type = options.type || 'info';
    const cancelText = options.calcelText || 'Cancel';
    const confirmText = options.confirmText || 'OK';
    const isConfirm = options.isConfirm || false;
    const hideAfter = options.hideAfter || 5000;
    const hasCallbacks = ammo.isObj(options.callbacks);

    const callbacks = {
      show: hasCallbacks && ammo.isFunc(options.callbacks.show) ? options.callbacks.show : () => {},
      cancel: hasCallbacks && ammo.isFunc(options.callbacks.cancel) ? options.callbacks.cancel : () => {},
      confirm: hasCallbacks && ammo.isFunc(options.callbacks.confirm) ? options.callbacks.confirm : () => {}
    };

    const note = renderers.append(actions.createNoteHtml({
      title,
      type,
      content,
      cancelText,
      confirmText,
      isConfirm
    }));

    callbacks.show();

    if ( ! isConfirm ) {
      setTimeout(() => renderers.remove(note), hideAfter);
    }

    ammo.delegateEvent('click', '.trigger.cancel', () => renderers.remove(note), note);

    ammo.delegateEvent('click', '.trigger.confirm', () => {
      callbacks.confirm();
      renderers.remove(note);
    }, note);
  });

/**
 * @description Initialize slickNote
 */
export const init = slickNote.getNode('actions', 'init');
