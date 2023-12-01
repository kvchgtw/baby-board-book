import Image from 'next/image'
import background_fox from '../../public/images/background_fox.jpg'
 
export default function Background() {
  return (
    <Image
      alt="Mountains"
      src={background_fox}
      placeholder="blur"
      quality={100}
      fill
      sizes="100vw"
      style={{
        objectFit: 'cover',
      }}
    />
  )
}