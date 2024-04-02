import Logo from 'components/Logo'
import Linkto from 'components/Linkto'

function Header({
  navData,
}: {
  navData: { fa: string; text: string; path: string }[]
}) {
  return (
    <nav className="main-nav">
      <Logo className="main-nav-logo" />
      <div>
        {navData.map(
          ({ fa, text, path }: { fa: string; text: string; path: string }) => (
            <Linkto
              className="main-nav-item"
              fa={fa}
              text={' ' + text + ' '}
              path={path}
              key={text}
            ></Linkto>
          )
        )}
      </div>
    </nav>
  )
}

export default Header
