import { useEffect } from 'react'

const useSEO = ({ title, description }) => {
  useEffect(() => {
    document.title = title ? `${title} | Lamsa Store` : 'Lamsa Store'

    if (description) {
      let metaDescription = document.querySelector("meta[name='description']")
      if (metaDescription) {
        metaDescription.setAttribute('content', description)
      } else {
        metaDescription = document.createElement('meta')
        metaDescription.name = 'description'
        metaDescription.content = description
        document.head.appendChild(metaDescription)
      }
    }
  }, [title, description])
}

export default useSEO