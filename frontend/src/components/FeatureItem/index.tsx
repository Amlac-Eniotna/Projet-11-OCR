function Feature({
  src,
  alt,
  title,
  text,
}: {
  src: string
  alt: string
  title: string
  text: string
}) {
  return (
    <div className="feature-item">
      <img src={src} alt={alt} className="feature-icon" />
      <h3 className="feature-item-title">{title}</h3>
      <p>{text}</p>
    </div>
  )
}

export default Feature
