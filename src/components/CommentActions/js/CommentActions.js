import ammo from '../../../common/libs/ammo';
import slickNote from '../../../common/libs/slick-note';
import api from '../../../common/api';

export const deleteComment = (commentId, postId, callback) => {
  ammo.sequence()
    .chain(seq => {
      slickNote.init({
        type: 'warning',
        title: 'Please confirm',
        content: 'Are your sure you want to delete this comment?',
        isConfirm: true,
        callbacks: {
          confirm: () => seq.resolve()
        }
      });
    })
    .chain(seq => {
      api.getPostComments(postId, (err, comments) => {
        if ( err ) {
          return callback();
        }
        seq.resolve(comments);
      })
    })
    .chain(seq => {
      const comments = seq.response.value;
      const matchingComments = comments.filter(comment => comment.id === commentId);

      if ( ! matchingComments[0] ) {
        return seq.resolve();
      }

      api.deleteComment(commentId, err => {
        if ( err ) {
          return slickNote.init({
            type: 'error',
            title: 'Error',
            content: 'Failed to delete the comment. Please try again.'
          });
        }
        seq.resolve();
      });
    })
    .chain(() => callback())
    .execute();
};

export const editComment = (commentId, postId, commentOptions, callback) => {
  ammo.sequence()
    .chain(seq => {
      api.getPostComments(postId, (err, comments) => {
        if ( err ) {
          return callback();
        }
        seq.resolve(comments);
      })
    })
    .chain(seq => {
      const comments = seq.response.value;
      const matchingComments = comments.filter(comment => comment.id === commentId);

      if ( ! matchingComments[0] ) {
        return seq.resolve();
      }

      api.editComment(commentId, commentOptions, err => {
        if ( err ) {
          return slickNote.init({
            type: 'error',
            title: 'Error',
            content: 'Failed to edit comment. Please try again.'
          });
        }
        seq.resolve();
      });
    })
    .chain(() => callback())
    .execute();
};

export const voteOnComment = (commentId, postId, voteOption, callback) => {
  ammo.sequence()
    .chain(seq => {
      api.getPostComments(postId, (err, comments) => {
        if ( err ) {
          return callback();
        }
        seq.resolve(comments);
      })
    })
    .chain(seq => {
      const comments = seq.response.value;
      const matchingComments = comments.filter(comment => comment.id === commentId);

      if ( ! matchingComments[0] ) {
        return seq.resolve();
      }

      api.voteOnComment(commentId, voteOption, err => {
        if (err) {
          return slickNote.init({
            type: 'error',
            title: 'Error',
            content: 'Failed to vote on comment. Please try again.'
          });
        }
        seq.resolve();
      });
    })
    .chain(() => callback())
    .execute();
};
