import React from 'react';
import '../css/Modal.css';
import ammo from '../../../common/libs/ammo';

class Modal extends React.Component {

  toggleOverlay = isActive => {
    const app = ammo.select('.component.app').get();
    const modalOverlay = ammo.select('.modal-overlay').get();

    if ( isActive && ! modalOverlay ) {
      ammo.appendAfter(`<div class="modal-overlay"></div>`, app);
    } else if ( ! isActive && modalOverlay ) {
      ammo.removeEl(modalOverlay);
    }
  };

  normalizeModal = () => {
    const modal = ammo.select(`.component.modal.${this.props.type}`).get();
    ammo.selectAll('input', modal).each(input => input.value = '');
    ammo.selectAll('textarea', modal).each(textarea => textarea.value = '');
    ammo.selectAll('select', modal).each(select => select.options.selectedIndex = 0)
  };

  componentWillReceiveProps(newProps) {
    if ( newProps.isActive && ammo.isFunc(this.props.showModal) ) {
      this.props.showModal();
    }
    if ( newProps.isActive !== this.props.isActive ) {
      this.toggleOverlay(newProps.isActive);
    }
  }

  render() {
    const title = this.props.title || '';
    const type = this.props.type || '';
    const cancelText = this.props.calcelText || 'Cancel';
    const confirmText = this.props.confirmText || 'OK';
    const isActive = this.props.isActive;

    return (
      <div className={`component modal ${type} ${isActive ? 'active' : ''}`}>
        <div className="modal-header">
          <div className="title">
            <h2>{title}</h2>
          </div>
        </div>
        <div className="modal-body">
          {this.props.content}
        </div>
        <div className="modal-footer">
          <button
            className="trigger cancel"
            onClick={() => {
              this.props.cancelModal(type);
              this.normalizeModal();
            }}
          >{cancelText}</button>
          <button
            className="trigger confirm"
            onClick={() => {
              const canConfirm = this.props.beforeConfirm();
              if ( ! canConfirm ) {
                return false;
              }
              this.props.confirmModal(type);
              this.normalizeModal();
            }}
          >{confirmText}</button>
        </div>
      </div>
    );
  }
}

export default Modal;
