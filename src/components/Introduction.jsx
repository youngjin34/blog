import './Introduction.css';

export default function Introduction() {
  return (
    <div className="introduction">
      <div>
        <h2>서영진 | 나도 개발자 시켜줘</h2>
        <img className="myimg" src="/images/introduction.jpg" />
        <div className="intro">
          <div className="contact">
            Contact & Channels <br />
            <hr className="hr1" />
            • Email | epik35@naver.com <br />
            • Kakao | epik35@naver.com <br />
            • Phone | 010-7632-7186 <br />• Github |{' '}
            <a href="https://github.com/youngjin34">
              https://github.com/youngjin34 <br />
            </a>
          </div>
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
      <div>
        <h3 className="front_end">😊Front-End Developer</h3>
        <hr className="hr2" />
        • 👍안녕하세요! 실력향상을 위해 언제나 노력하는 서영진입니다.
        <br />
        • 리액트를 중점적으로 공부하고 있으며 NodeJs를 함께 공부해 다양한 관점을
        고려합니다.
        <br />
        • 깃허브를 통해 꾸준히 공부한 것들을 기록합니다.
        <br />
      </div>
      <br />
      <br />
      <br />
      <div className="stack">
        <h3>🎈Stack</h3>
        <hr className="hr2" />
        <h5>Front-End</h5>
        <div className="stack_content">
          • React JS <br />
          • Vanilla JS <br />
          • Html5/Css3 <br />
          • Axios
          <br />
        </div>
        <br />
        <h5>Collaboration & Tools</h5>
        <div className="stack_content">
          • Slack , Discord <br />
          • VS Code <br />
          • Git, Github <br />
        </div>
      </div>
      <br />
      <br />
      <br />
      <div>
        <h3 className="front_end">😊프로젝트</h3>
        <hr className="hr2" />
        <a href="https://github.com/dogcareproject/FrontEnd">
          <img className="img_dogcare" src="/images/dogcare.jpg" /> <br />•
          DogCare
        </a>
        <br />
        <br />
        <div className="stack_content">
          반려견 피부 및 안구 진단을 위한 어플리케이션입니다. 직접 병원에 <br />
          가지 않아도 집에서 편하게 진료를 볼 수 있는 어플리케이션입니다.
        </div>
        <div>
          <br />
          <br />
          <b>Front-End 사용 기술</b> <br />
          ReactJS / Axios / html5/Css3 <br />
          <hr className="hr2" />
          <b>보안 및 인증</b>
          <br />
          <div className="stack_content">
            • JWT 토큰 관리: Access/Refresh 토큰 전략을 사용하여 CSRF 공격을
            방지. Access 토큰은 크로스플랫폼 에서도 유연하게 동작할 수 있도록
            (특히 IOS 14버전 이후의 애플 디바이스) 바디에서 주고받으며, Refresh
            토큰은 HttpOnly/SameSite 쿠키에 저장하여 관리. <br />
            • Axios 인터셉터 구현 : 로그인 유지 요청 커스텀훅에 의한 토큰 인증시
            헤더에 Access 토큰을 담아 서버에 전달하고 토큰 만료시 리프레시
            토큰을 조회하여 액세스토큰 갱신 및 재로그인 요청. <br />• 토큰인증
            커스텀훅 구현 : 로그인 유지 및 토큰인증이 필요한 페이지에서 CLIENT
            SIDE 상황인지를 체크한 후 해당하는 경우에만 서버에 토큰 인증을
            요청하여 유저 로그인 정보를 유지함.
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
      <div>
        <h3 className="education">Education</h3>
        <hr className="hr2" />
        <h5>Front-End</h5>
        <div className="stack_content">
          • 가천대학교 <br />
          <span>&nbsp;&nbsp;&nbsp;컴퓨터공학과 </span>
          <br />
        </div>
        <br />
      </div>
      <br />
      <br />
      <br />
    </div>
  );
}
