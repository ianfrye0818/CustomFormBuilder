import { Link } from '@tanstack/react-router';

export default function Header() {
  return (
    <header className='p-2 flex justify-between items-center text-lg container mx-auto h-16'>
      <div>
        <p>LOGO</p>
      </div>
      <nav className='flex gap-2'>
        <Link
          to='/'
          activeProps={{
            className: 'font-bold',
          }}
          activeOptions={{ exact: true }}
        >
          Home
        </Link>
        <Link
          to='/create-form'
          activeProps={{
            className: 'font-bold',
          }}
        >
          Form Builder
        </Link>
      </nav>
    </header>
  );
}
