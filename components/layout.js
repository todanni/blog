import Image from 'next/image'
import styles from './layout.module.css'
import logo from '../public/images/logo_transparent_background.png'

export const siteTitle = 'ToDanni Blog'

export default function Layout({ children, home }) {
  return (
    <div className={styles.layout}>
      <nav>
        <ul className={styles.navlist}>
          <li>
            <a href="/">HOME</a>
          </li>
          <li>
            <a href="/posts">POSTS</a>
          </li>
          <li>
            <a href="/about">ABOUT</a>
          </li>
        </ul>
      </nav>
      <div>
        <Image priority src={logo} alt="todanni-logo" className={styles.logo} />
      </div>
      <div className={styles.posts}>
        <main>{children}</main>
      </div>
    </div>
  )
}
