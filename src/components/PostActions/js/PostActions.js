import ammo from '../../../common/libs/ammo';
import slickNote from '../../../common/libs/slick-note';
import api from '../../../common/api';
import { getCachedItem } from '../../../store';


export const deletePost = (postId, callback) => {
  ammo.sequence()
    .chain(seq => {
      slickNote.init({
        type: 'warning',
        title: 'Please confirm',
        content: 'Are your sure you want to delete this post?',
        isConfirm: true,
        callbacks: {
          confirm: () => seq.resolve()
        }
      });
    })
    .chain(seq => {
      api.getPost(postId, (err, post) => {
        if ( err ) {
          return seq.reject(err);
        }
        seq.resolve(post);
      })
    })
    .chain(seq => {
      if ( seq.response.error ) {
        return seq.resolve();
      }

      api.deletePost(postId, err => {
        if ( err ) {
          return slickNote.init({
            type: 'error',
            title: 'Error',
            content: 'Failed to delete the post. Please try again.'
          });
        }
        seq.resolve();
      });
    })
    .chain(() => callback())
    .execute();
};

export const editPost = (postId, postOptions, callback) => {
  ammo.sequence()
    .chain(seq => {
      api.getPost(postId, (err, post) => {
        if ( err ) {
          return callback();
        }
        seq.resolve(post);
      })
    })
    .chain(seq => {
      api.editPost(postId, postOptions, (err, post) => {
        if ( err ) {
          return slickNote.init({
            type: 'error',
            title: 'Error',
            content: 'Failed to edit the post. Please try again.'
          });
        }

        seq.resolve();
      });
    })
    .chain(() => callback())
    .execute();
};

export const voteOnPost = (postId, voteOption, callback) => {
  ammo.sequence()
    .chain(seq => {
      api.getPost(postId, (err, post) => {
        if ( err ) {
          return callback();
        }
        seq.resolve(post);
      })
    })
    .chain(seq => {
      api.voteOnPost(postId, voteOption, err => {
        if ( err ) {
          return slickNote.init({
            type: 'error',
            title: 'Error',
            content: 'Failed to vote on the post. Please try again.'
          });
        }
        seq.resolve();
      });
    })
    .chain(() => callback())
    .execute();
};
