import { FormEvent, useEffect, useRef, useState } from 'react';
import { AnimatedLetters } from '../AnimatedLetters/animatedLetters.tsx';
import emailjs from '@emailjs/browser';
import { LatLngExpression } from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import Loader from 'react-loaders';
import './contact.scss';

export const Contact = () => {
    const position: LatLngExpression = [44.96366, 19.61045];

    const [letterClass, setLetterClass] = useState('text-animate');
    const form = useRef<HTMLFormElement | null>(null);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setLetterClass('text-animate-hover');
        }, 3000);
        return () => clearTimeout(timeoutId);
    }, []);

    const sendEmail = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        emailjs
            .sendForm(
                'gmail',
                'template_YeJhZkgb',
                form.current || '',
                'your-token'
            )
            .then(
                () => {
                    alert('Message successfully sent!');
                    window.location.reload();
                },
                () => {
                    alert('Failed to send the message, please try again');
                }
            );
    };

    return (
        <>
            <div className="container contact-page">
                <div className="text-zone">
                    <h1>
                        <AnimatedLetters
                            letterClass={letterClass}
                            strArray={[
                                'C',
                                'o',
                                'n',
                                't',
                                'a',
                                'c',
                                't',
                                ' ',
                                'm',
                                'e',
                            ]}
                            idx={15}
                        />
                    </h1>
                    <p>
                        I am interested in freelance opportunities - especially
                        on ambitious or large projects. However, if you have any
                        other requests or questions, don't hesitate to contact
                        me using below form either.
                    </p>
                    <div className="contact-form">
                        <form ref={form} onSubmit={sendEmail}>
                            <ul>
                                <li className="half">
                                    <input
                                        placeholder="Name"
                                        type="text"
                                        name="name"
                                        required
                                    />
                                </li>
                                <li className="half">
                                    <input
                                        placeholder="Email"
                                        type="email"
                                        name="email"
                                        required
                                    />
                                </li>
                                <li>
                                    <input
                                        placeholder="Subject"
                                        type="text"
                                        name="subject"
                                        required
                                    />
                                </li>
                                <li>
                                    <textarea
                                        placeholder="Message"
                                        name="message"
                                        required
                                    ></textarea>
                                </li>
                                <li>
                                    <input
                                        type="submit"
                                        className="flat-button"
                                        value="SEND"
                                    />
                                </li>
                            </ul>
                        </form>
                    </div>
                </div>
                <div className="info-map">
                    Slobodan Gajić,
                    <br />
                    Serbia,
                    <br />
                    Branka RadiČevića 19, 22000 <br />
                    Sremska Mitrovica <br />
                    <br />
                    <span>freelancerslobodan@gmail.com</span>
                </div>
                <div className="map-wrap">
                    <MapContainer center={position} zoom={13}>
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        <Marker position={position}>
                            <Popup>
                                Sloba lives here, come over for a cup of coffee
                                :)
                            </Popup>
                        </Marker>
                    </MapContainer>
                </div>
            </div>
            <Loader type="pacman" active={true} />
        </>
    );
};
