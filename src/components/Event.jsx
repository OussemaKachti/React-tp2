import { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

function Event({ id, name, price, nbTickets, nbParticipants, image, like, onToggleLike, onBook }) {
  const [imgSrc, setImgSrc] = useState(image || '/images/placeholder.jpg')

  const soldOut = (nbTickets ?? 0) <= 0

  useEffect(() => {
    if (soldOut) {
      setImgSrc('/images/sold_out.jfif')
      return
    }
    setImgSrc(image || '/images/placeholder.jpg')
  }, [image, soldOut])

  return (
    <Card className="h-100" style={{ width: '18rem' }}>
      <Card.Img
        variant="top"
        src={imgSrc}
        alt={name}
        onError={() => setImgSrc('/images/placeholder.jpg')}
      />

      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>
          <div>Price : {price}</div>
          <div>Number of tickets : {nbTickets}</div>
          <div>Number of participants : {nbParticipants}</div>
        </Card.Text>

        {soldOut ? <div className="mb-2 text-danger fw-bold">Sold Out</div> : null}

        <div className="d-flex gap-2">
          <Button
            variant={like ? 'danger' : 'success'}
            onClick={() => onToggleLike?.(id)}
          >
            {like ? 'Dislike' : 'Like'}
          </Button>

          <Button
            variant="primary"
            disabled={soldOut}
            onClick={() => onBook?.(id)}
          >
            Book an event
          </Button>
        </div>
      </Card.Body>
    </Card>
  )
}

export default Event
