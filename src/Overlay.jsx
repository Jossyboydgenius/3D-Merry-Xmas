export default function Overlay({ inside, setInside }) {
  return (
    <>
      <header>
        <img draggable={false} width="100%" src="/merry_xmas.svg" />
      </header>
      <footer className="footer">
        <button
          className="button--explore"
          onClick={() => {
            setInside(!inside)
          }}>
          SCROLL TO LOOK INSIDE
        </button>
        <br />
        <div style={{ textAlign: 'center' }}>
          Created with love by Awe Joseph.
          <div>Using Luma AI for the outside Gaussian Splatting (outside effects),<br />and BlockadeLabs for the internal snow globe.</div>
        </div>
      </footer>
    </>
  )
}
