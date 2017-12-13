import React from 'react';
import PropTypes from 'prop-types';
import '../css/OptionsPanel.css';
import FaCommenting from 'react-icons/lib/fa/commenting';
import FaThumbsUp from 'react-icons/lib/fa/thumbs-up';
import FaThumbsDown from 'react-icons/lib/fa/thumbs-down';
import FaEdit from 'react-icons/lib/fa/edit';
import FaTrashO from 'react-icons/lib/fa/trash-o';
import ammo from '../../../common/libs/ammo';

const OptionsPanel = props => {
  const type = props.type || '';

  return (
    <div className="component options-panel">

      {type === 'post' && (
        <button className="trigger comment" title={`Add comment`} onClick={() => {
          if ( ammo.isFunc(props.onAddComment) ) {
            props.onAddComment();
          }
        }}>
          <span className="icon"><FaCommenting/></span>
        </button>
      )}

      <button className="trigger like" title={`Upvote ${type}`} onClick={() => props.onUpvote()}>
        <span className="icon"><FaThumbsUp/></span>
      </button>

      <button className="trigger dislike" title={`Downvote ${type}`} onClick={() => props.onDownvote()}>
        <span className="icon"><FaThumbsDown/></span>
      </button>

      <button className="trigger edit" title={`Edit ${type}`} onClick={() => props.onEdit()}>
        <span className="icon"><FaEdit/></span>
      </button>

      <button className="trigger delete" title={`Delete ${type}`} onClick={() => props.onDelete()}>
        <span className="icon"><FaTrashO/></span>
      </button>
    </div>
  )
};

OptionsPanel.propTypes = {
  onUpvote: PropTypes.func,
  onDownvote: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func
};

export default OptionsPanel;
