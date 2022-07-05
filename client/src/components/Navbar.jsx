import { HiMenuAlt4 } from 'react-icons/hi';
import { AiOutlineClose } from 'react-icons/ai';
import { useState } from 'react';
const NavbarItem = ({ title, classProps }) => {
    return (
        <li className={`mx-4 cursor-pointer ${classProps}`}>
            {title}
        </li>
    );
}

const Navbar = () => {
    const [toggleMenu, setToggleMenu] = useState(false);
    return (
        <nav className="w-full flex md:justify-center justify-between items-center"> 
            <div className="md:flex-[0.5] flex-initial justify-center items-center">
                <h1 className="text-white"> Coin Toss </h1>
            </div>
                <ul className='text-white md:flex hidden list-none flex-row justify-between items-center'> 
                    {["market","exchange","tuts", "wallets"].map((item, index) => (
                        <NavbarItem key={item+index} title={item} />
                    ))}
                    <li className='bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]'>
                        Login
                    </li>
                </ul>
                <div className='flex relative'>
                        {toggleMenu === true ?
                            <AiOutlineClose fontSize={28} className='text-white md:hidden cursor-pointer' onClick={() => setToggleMenu(false)}/>
                            : 
                            <HiMenuAlt4 fontSize={28} className='text-white md:hidden cursor-pointer' onClick={() => setToggleMenu(true)}/>
                        }
                </div>
           
        </nav>
    );
}
export default Navbar;