import "./index.css";

export default function HomePage() {
  return (
    <div className='home-page'>
      <div className='left-menus'>
        <div id='heading'>Quizzie</div>
        <div className='menus'>
          <div>Dashboard</div>
          <div>Analytics</div>
          <div>Create Quiz</div>
        </div>
        <div id='footer'>LOGOUT</div>
      </div>
      <div className='right-display-space'></div>
    </div>
  );
}
