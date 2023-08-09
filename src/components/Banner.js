import { useState, useEffect, useMemo } from "react";
import { Col, Container, Row } from "react-bootstrap"
import headerImg from "../assets/img/header-img.svg";

export const Banner = () => {
    const [loopNum, setLoopNum] = useState(0); //index we're at in toRotate
    const [isDeleting, setIsDeleting] = useState(false); //whether we're typing out or deleting a word
    const toRotate = useMemo(() => ["Aspiring Programmer", "Cat Lover", "Game/Puzzle Enjoyer"], []);
    const [text, setText] = useState(''); //the portion of the word being displayed i.e. w, we, web,...
    const [delta, setDelta] = useState(300 - Math.random() * 100); // how fast one letter is typed after previous letter
    const period = 2000; //time between each word

    //deletes faster than types out, like when human actually types
    //function responsible for typing and deleting
    useEffect(() => {
        const tick = () => {
            let i = loopNum % toRotate.length
            let fullText = toRotate[i];
            let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

            setText(updatedText);

            if (isDeleting) {
                setDelta(prevDelta => prevDelta / 2);
            }

            if (!isDeleting && updatedText === fullText) {
                setIsDeleting(true);
                setDelta(period);
            } else if (isDeleting && updatedText === '') {
                setIsDeleting(false);
                setLoopNum(loopNum + 1); //move on to next text
                setDelta(500);
            }
        };

        //interval between text get updated
        let ticker = setInterval(() => {
            tick();
        }, delta);

        return () => { clearInterval(ticker) };
    }, [isDeleting, loopNum, text, toRotate, delta]) //run everytime text gets updated

    return (
        <section className="banner" id="home">
            <Container>
                <Row className="align-items-center">
                    <Col xs={12} md={6} xl={7}>
                        <span className="tagline">Welcome to my portfolio</span>
                        <h1>{`Hi I'm Nanz `}<span className="wrap">{text}</span></h1>
                        <p>CS @ Carnegie Mellon University, graduating December 2024</p>
                    </Col>
                    <Col xs={12} md={6} xl={5}>
                        <img src={headerImg} alt="Header Img" />
                    </Col>
                </Row>
            </Container>
        </section>
    )
}