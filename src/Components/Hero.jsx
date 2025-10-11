export default function Hero() {

    return (
        <>
            <div className="heroContainer d-flex justify-content-evenly">
                <div className="imgContainer">
                    <img src="/heroImg/SantissimaTrinita.png" alt="SanTa" />
                </div>
                <div className="imgContainer">
                    <img src="/heroImg/SanBellino.png" alt="SanBe" />
                </div>
                <div className="imgContainer">
                    <img src="/heroImg/SanFilippoNeri.png" alt="SanFi" />
                </div>
            </div>
        </>
    )
}