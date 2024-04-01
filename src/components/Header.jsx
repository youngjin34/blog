import { Link } from 'react-router-dom';

import './Header.css';

export default function Header() {
  return (
    <div>
      <h3>
        <Link className="Header" to={'/'}>
          나도 개발자 시켜줘 블로그
        </Link>
      </h3>
      <hr className="hr-1" />
    </div>
  );
}
