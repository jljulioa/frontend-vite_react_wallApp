import { useAuth } from '../context/AuthContext';
import { Navbar, Dropdown, Avatar} from 'flowbite-react'
import { Link, useLocation } from 'react-router-dom'



export default function NavbarComponent() {

    const { isAuth, user, logout, loading} = useAuth()

    const location = useLocation()

    const isPathMatch = (path) => location.pathname === path;

  return (
    <Navbar fluid rounded className=' w-full h-16 text-slate-200 sticky top-0 z-20 rounded-none bg-[#240a34] ring-1 ring-[#7d17bc]'>
        <div className=' flex justify-center items-center md:order-1 w-auto'>
            <Navbar.Brand className='ml-4' href="#">
                {/*  <img src="/favicon.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" /> */}
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">App</span>
            </Navbar.Brand>
            <Navbar.Collapse className='ml-8'>
              <div>
                <Link to="/" className={`hover:bg-gradient-to-t from-[#240a34] to-[#621c93] px-6 py-6 ${isPathMatch('/') ? 'bg-gradient-to-t from-[#240a34] to-[#621c93]' : ''}`}>Home</Link>
                <Link to="/dashboard" className={`hover:bg-gradient-to-t from-[#240a34] to-[#621c93] px-6 py-6 ${isPathMatch('/dashboard') ? 'bg-gradient-to-t from-[#240a34] to-[#621c93]' : ''}`}>Dashboard</Link>
                <Link to="/profile" className={`hover:bg-gradient-to-t from-[#240a34] to-[#621c93] px-6 py-6 ${isPathMatch('/profile') ? 'bg-gradient-to-t from-[#240a34] to-[#621c93]' : ''}`}>Profile</Link>
              </div>
            </Navbar.Collapse>
        </div>
    <div className="flex md:order-2 felx justify-center items-center">
        {!loading && isAuth && user ? (
          <>
            <Link to="/uploadwall" className='md:mr-4 px-4 py-2 hover:bg-[#621c93] ring-1 ring-[#7d17bc] rounded-full hover:shadow-lg hover:shadow-[#621c93]'>
            <svg className="w-6 h-6 text-gray-300" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg"  fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>Upload-1</title> <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"> <g id="Upload-1"> <rect id="Rectangle" fillRule="nonzero" x="0" y="0" width="24" height="24"> </rect> <line x1="12" y1="11" x2="12" y2="20" id="Path" stroke="currentColor" strokeWidth="2" strokeLinecap="round"> </line> <path d="M15,13 L12.7071,10.7071 C12.3166,10.3166 11.6834,10.3166 11.2929,10.7071 L9,13" id="Path" stroke="currentColor" strokeWidth="2" strokeLinecap="round"> </path> <path d="M8,16 L6,16 C4.34315,16 3,14.6569 3,13 C3,11.3431 4.34315,10 6,10 C6,6.68629 8.68629,4 12,4 C15.3137,4 18,6.68629 18,10 C19.6569,10 21,11.3431 21,13 C21,14.6569 19.6569,16 18,16 L16,16" id="Path" stroke="currentColor" strokeWidth="2" strokeLinecap="round"> </path> </g> </g> </g></svg>
            </Link>
            <Dropdown className='rounded-xl mt-4 w-2/3 md:w-auto'
            arrowIcon={false}
            inline
            label={
              <Avatar alt="User settings" img={user?.profilePic?.url100 || "./src/assets/user.svg"}  rounded />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">{user?.username}</span>
              <span className="block truncate text-sm font-medium">{user?.email}</span>
            </Dropdown.Header>
            <Link to="/profile" className=' transition duration-200 hover:font-semibold overflow-hidden w-full ml-4' >Profile</Link>
            <Dropdown.Divider />
            <Link to="/dashboard" className='  transition duration-200 hover:font-semibold overflow-hidden w-full ml-4' >Dashboard</Link>
            <Dropdown.Divider />
            <Link onClick={logout} className='  transition duration-200 hover:font-semibold overflow-hidden w-full ml-4' >Logout</Link>
          </Dropdown>
          </>
        ):(
        <div className='h-10 flex justify-center items-center'>
            <Link className='md:ml-4 px-4 py-2 hover:bg-[#621c93] ring-1 ring-[#7d17bc] rounded-lg' to="/login">Login</Link>
            <Link className='md:ml-4 px-4 py-2 hover:bg-[#621c93] ring-1 ring-[#7d17bc] rounded-lg' to="/register">Register</Link>
        </div>
        )}
    </div>
 
  </Navbar>
  );
}
