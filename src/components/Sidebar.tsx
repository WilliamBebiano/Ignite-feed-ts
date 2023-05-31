import { Avatar } from './Avatar'
import styles from './Sidebar.module.css'
import {PencilLine} from '@phosphor-icons/react'

export function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <img 
      className={styles.cover} 
      src='https://images.unsplash.com/photo-1605379399843-5870eea9b74e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=30'alt='cover photo'/>
      
      <div className={styles.profile}>
        <Avatar src="https://github.com/WilliamBebiano.png" alt=''
        onClick={()=>window.open('https://github.com/WilliamBebiano')}/>
        <strong>William Bebiano</strong>
        <span>Web Developer</span>

        <footer>
          <a href='#'>
            <PencilLine size={20} />
            Editar seu Perfil
          </a>
        </footer>

      </div>
    </aside>
  )
}
