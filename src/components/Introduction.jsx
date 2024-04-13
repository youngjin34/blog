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
            • Phone | 010-7632-7186 <br />
            • Github | https://github.com/youngjin34 <br />
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
    </div>
  );
}
