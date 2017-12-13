import React from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../css/PostFooter.css';
import ammo from '../../../common/libs/ammo';
import { updateActiveCategory, updateActivePost, enableEditPostModal, enableAddCommentModal } from '../../../store/actions';
import { dispatchLocationUpdate } from '../../../global-events';
import OptionsPanel from '../../OptionsPanel';
import CounterVoteScore from '../../CounterVoteScore';
import CounterComments from '../../CounterComments';

class PostFooter extends React.Component {
  state = {
    isCommentsSliderActive: false
  };

  render() {
    const post = this.props.post;

    return (
      <footer className="component post-footer">
        <div className="category" title="Category" style={{background: ammo.randomGradient(122)}}>
          <Link
            to={`/${post.category}`}
            replace={true}
            className="trigger view-category"
            title={`View posts from category '${post.category}'`}
            onClick={() => {
              this.props.updateActiveCategory(post.category);

              // dispatch global event
              dispatchLocationUpdate();
            }}
          >
            <span className="category-name">{post.category}</span>
          </Link>
        </div>

        <OptionsPanel
          type={'post'}
          onAddComment={() => {
            this.props.updateActivePost(post);
            this.props.enableAddCommentModal();

            if ( ammo.isFunc(this.props.onAddComment) ) {
              this.props.onAddComment();
            }
          }}
          onUpvote={() => this.props.upvotePost(post.id)}
          onDownvote={() => this.props.downvotePost(post.id)}
          onEdit={() => {
            this.props.updateActivePost(post);
            this.props.enableEditPostModal();
          }}
          onDelete={() => this.props.deletePost(post.id)}
        />

        <CounterVoteScore score={post.voteScore}/>

        <button
          className="trigger toggle-comments"
          onClick={() => this.props.toggleComments(post.id)} title="Toggle comments"
        >
          <CounterComments count={post.commentCount}/>
        </button>
      </footer>
    );
  }
}

PostFooter.propTypes = {
  post: PropTypes.object
};

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    updateActiveCategory: category => dispatch(updateActiveCategory(category)),
    updateActivePost: post => dispatch(updateActivePost(post)),
    enableEditPostModal: () => dispatch(enableEditPostModal()),
    enableAddCommentModal: () => dispatch(enableAddCommentModal())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostFooter);
