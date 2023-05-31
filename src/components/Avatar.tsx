import { ImgHTMLAttributes } from 'react'
import styles from './Avatar.module.css'
import PropTypes from 'prop-types';

interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement>{
  hasBorder?: boolean;
}

export function Avatar({hasBorder = true, ...props }: AvatarProps){

 return(
    <img 
    className={hasBorder? styles.avatarWithBorder :styles.avatar} 
    {...props}
  />
 )
}

Avatar.propTypes = {
  hasBorder: PropTypes.bool,
  src: PropTypes.string
}
