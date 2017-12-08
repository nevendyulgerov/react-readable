import React from 'react';
import '../css/PostFooter.css';
import FaComment from 'react-icons/lib/fa/comment';
import ammo from '../../../common/libs/ammo';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { updateActiveCategory } from '../../../store/actions';
import OptionsPanel from '../../OptionsPanel';
import CounterVoteScore from '../../CounterVoteScore';
import CounterComments from '../../CounterComments';

class PostFooter extends React.Component {
  state = {
    isCommentsSliderActive: false
  };

  updateActiveCategory = category => this.props.updateActiveCategory(category);

  render() {
    const post = this.props.post;
    const hasComments = post.commentCount > 0;

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
          onComment={() => this.props.addComment(post.id)}
          onUpvote={() => this.props.upvotePost(post.id)}
          onDownvote={() => this.props.downvotePost(post.id)}
          onEdit={() => this.props.setEditablePost(post.id)}
          onDelete={() => this.props.deletePost(post.id)}
        />

        <CounterVoteScore score={post.voteScore}/>

        <button
          className="trigger toggle-comments"
          onClick={() => this.props.toggleComments(post.id)} title="Toggle count"
        >
          <CounterComments count={post.commentCount}/>
        </button>
      </footer>
    );
  }
}

const mapStateToProps = state => {
  return {
    activeCategory: state.activeCategory
  }
};

const mapDispatchToProps = dispatch => {
  return {
    updateActiveCategory: category => dispatch(updateActiveCategory(category))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostFooter);
