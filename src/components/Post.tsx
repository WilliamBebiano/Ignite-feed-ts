import { format, formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

import { Avatar } from './Avatar'
import { Comment } from './Comment'
import styles from './Post.module.css'
import { FormEvent, useState, ChangeEvent, InvalidEvent } from 'react';

interface Author {
  name: string;
  role: string;
  avatarUrl: string;
}

interface Content {
  type: 'paragraph' | 'link';
  content: string;
}

export interface PostType{
  id: number;
  author: Author;
  publishedAt: Date;
  content: Content[];
}

interface PostProps {
  post: PostType;
  
}

export function Post({ post }: PostProps) {

  // esta variavel guarda o array de comentarios 
  const [comments,setComments] = useState([
    'Post muito Bacana, hein?!'
  ])
 
  // esta variavel guarda toda mudanca do input da text area
  const [newCommentText,  setNewCommentText ] = useState('')


  const publishedDateFormatted = format(post.publishedAt, "d 'de' LLLL 'ás' HH:mm'h'", {
    locale: ptBR,
  })

  const publishedDateRelativeToNow = formatDistanceToNow(post.publishedAt, {
    locale: ptBR,
    addSuffix: true,
  })

  
  
  //funcao que segura o evento de criacao de um novo comentario 
  function handleCreateNewComment(event: FormEvent) {
    event.preventDefault()

    setComments([...comments, newCommentText])

    setNewCommentText('')//limpa a text area apos publicacao do post
    
   }
 
   //funcao que segura todas as mudancas dentro da text area
   function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('')
    setNewCommentText(event.target.value)
   }

   function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('Este campo é obrigatorio')
   }

   // Desenvolvendo a funcao deletar que enviara uma propriedade para o Botao delete do componete Comments
   // conceitos de imutabilidade , as variaveis nao sofrem mutacao, nos criamos um valor (um novo espacona memoria)
   function deleteComment(commentToDelete: string) {
    const commentWithoutDeletedOne = comments.filter(comment => {
      return comment !== commentToDelete
    })
    setComments(commentWithoutDeletedOne)
   }
   const isNewCommentEmpty = newCommentText.length === 0

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author} >
          <Avatar src={post.author.avatarUrl} />
          <div className={styles.authorInfo}>
            <strong>{post.author.name}</strong>
            <span>{post.author.role}</span>
          </div>
        </div>
        <time title={publishedDateFormatted} dateTime={post.publishedAt.toISOString()}>
          {publishedDateRelativeToNow}
        </time>
      </header>

      <div className={styles.content}>
      {post.content.map( line => {
          if (line.type === 'paragraph') {
            return <p key={uuidv4()}>{line.content}</p>;
          } else if (line.type === 'link') {
            return (
              <p key={uuidv4()}>
                <a href='#'>{line.content}</a>
              </p>
            );
          }
          return null; // Adicionado para tratar caso line.type não corresponda a 'paragraph' nem 'link'
        })}
      </div>

      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>
        
        <textarea
          name='comment'
          placeholder='Deixe um comentario'
          value={newCommentText}
          onChange={handleNewCommentChange}
          onInvalid={handleNewCommentInvalid}
          required
        />

        <footer>
          <button type='submit' disabled={isNewCommentEmpty}>Publicar</button>
        </footer>
      </form>
      <div className={styles.commentList}>
       {comments.map(comment => {
        return <Comment key={comment} content={comment} onDeleteComment={deleteComment}/>//envio a funcao como propriedade para o component Comment

       })}
      </div>
    </article>
  )
}

Post.propTypes = {
  author: PropTypes.object,
  publishedAt: PropTypes.instanceOf(Date).isRequired,
  content: PropTypes.array,
  line: PropTypes.string,
}
