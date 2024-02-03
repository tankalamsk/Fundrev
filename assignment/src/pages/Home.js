import { Link } from 'react-router-dom'
import './Home.css'

function Home (){
    return (
        <div className='Home'>
        <button >
            <Link className="Link" to= "/Invester">Invester</Link>
            
        </button>
        <button>
        <Link className="Link" to= "/Startup">Startup</Link>
        </button>
        </div>
    )
}

export default Home