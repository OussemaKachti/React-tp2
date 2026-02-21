import { useEffect, useMemo, useRef, useState } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Alert from 'react-bootstrap/Alert'
import Event from './Event.jsx'

import eventsData from '../events.json'

function Events() {
  const [events, setEvents] = useState([])
  const [bookMessageVisible, setBookMessageVisible] = useState(false)
  const [welcomeVisible, setWelcomeVisible] = useState(false)

  const bookingTimerRef = useRef(null)
  const welcomeTimerRef = useRef(null)

  useEffect(() => {
    console.log('Events mounted')
    setEvents(eventsData)

    setWelcomeVisible(true)
    welcomeTimerRef.current = setTimeout(() => {
      setWelcomeVisible(false)
    }, 3000)

    return () => {
      console.log('Events unmounted')
      if (bookingTimerRef.current) clearTimeout(bookingTimerRef.current)
      if (welcomeTimerRef.current) clearTimeout(welcomeTimerRef.current)
    }
  }, [])

  useEffect(() => {
    if (!bookMessageVisible) return
    if (bookingTimerRef.current) clearTimeout(bookingTimerRef.current)
    bookingTimerRef.current = setTimeout(() => {
      setBookMessageVisible(false)
    }, 2000)
  }, [bookMessageVisible])

  useEffect(() => {
    console.log('Events updated')
  }, [events])

  const sortedEvents = useMemo(() => {
    return [...events].sort((a, b) => a.id - b.id)
  }, [events])

  const buy = (id) => {
    setEvents((prev) =>
      prev.map((e) => {
        if (e.id !== id) return e
        if (e.nbTickets <= 0) return e
        return {
          ...e,
          nbTickets: e.nbTickets - 1,
          nbParticipants: e.nbParticipants + 1,
        }
      }),
    )
    setBookMessageVisible(true)
  }

  const toggleLike = (id) => {
    setEvents((prev) =>
      prev.map((e) => (e.id === id ? { ...e, like: !e.like } : e)),
    )
  }

  return (
    <>
      {welcomeVisible ? (
        <Alert variant="success">Hey welcome to Esprit Events</Alert>
      ) : null}

      {bookMessageVisible ? (
        <Alert variant="success" onClose={() => setBookMessageVisible(false)} dismissible>
          You have booked an event
        </Alert>
      ) : null}

      <Row className="g-3">
        {sortedEvents.map((event) => (
          <Col key={event.id} xs={12} md={6} lg={4}>
            <Event
              id={event.id}
              name={event.name}
              price={event.price}
              nbTickets={event.nbTickets}
              nbParticipants={event.nbParticipants}
              image={event.image}
              like={event.like}
              onToggleLike={toggleLike}
              onBook={buy}
            />
          </Col>
        ))}
      </Row>
    </>
  )
}

export default Events
