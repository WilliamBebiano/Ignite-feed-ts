import { ThumbsUp, Trash } from '@phosphor-icons/react'
import styles from './Comment.module.css'
import PropTypes from 'prop-types';
import { Avatar } from './Avatar'
import { useState } from 'react';

interface CommentProps {
  content: string;
  onDeleteComment: (comment: string) => void;
}

export function Comment({content, onDeleteComment}: CommentProps) {
  const [likeCount, setLikeCount] = useState(0)

  function handleLikeComment() {
    // setLikeCount(likeCount + 1)

    setLikeCount((likes) => {
      return likes + 1
    })

   }

  function handleDeleteComment() {
    
    onDeleteComment(content)
  }


  return (
    <div className={styles.comment}>
      <Avatar hasBorder={false} src="https://github.com/WilliamBebiano.png" alt='' />
      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong> William Bebiano</strong>
              <time title='23 de maio ás 11:08h' dateTime='2023-05-23 11:08:30'>
                Cerca de 1h atras
              </time>
            </div>

            <button onClick={handleDeleteComment} title='Deletar Comentario'>
              <Trash size={24}/>
            </button>

          </header>

          <p>{content}</p>

        </div>
        <footer>
          <button onClick={handleLikeComment}>
            <ThumbsUp/>
            Aplaudir <span>{likeCount}</span>
          </button>
        </footer>
      </div>
    </div>
  )
}


Comment.propTypes = {
  content: PropTypes.string,
  onDeleteComment: PropTypes.func,
  
}
