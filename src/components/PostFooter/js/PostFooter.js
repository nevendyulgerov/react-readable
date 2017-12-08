import React from 'react';
import '../css/PostFooter.css';
import ammo from '../../../common/libs/ammo';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { updateActiveCategory, updateActivePost, enableEditPostModal, enableAddCommentModal } from '../../../store/actions';
import OptionsPanel from '../../OptionsPanel';
import CounterVoteScore from '../../CounterVoteScore';
import CounterComments from '../../CounterComments';

class PostFooter extends React.Component {
  state = {
    isCommentsSliderActive: false
  };

  updateActiveCategory = category => this.props.updateActiveCategory(category);

  updateActivePost = post => this.props.updateActivePost(post);

  render() {
    const post = this.props.post;

    return (
      <footer className="component post-footer">
        <div className="category" title="Category" style={{background: ammo.randomGradient(122)}}>
          <Link
            to={`${post.category}`}
            className="trigger view-category"
            title={`View posts from category '${post.category}'`}
            onClick={() => this.updateActiveCategory(post.category)}
          >
            <span className="category-name">{post.category}</span>
          </Link>
        </div>

        <OptionsPanel
          type={'post'}
          onAddComment={() => {
            this.props.updateActivePost(post);
            this.props.enableAddCommentModal();
          }}
          onUpvote={() => this.props.upvotePost(post.id)}
          onDownvote={() => this.props.downvotePost(post.id)}
          onEdit={() => {
            this.updateActivePost(post);
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

const mapStateToProps = state => {
  return {
    activeCategory: state.activeCategory,
    activePost: state.activePost
  }
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
