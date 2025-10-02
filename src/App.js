import Header from './components/Header';
import Footer from './components/Footer';
import BlogContent from './components/BlogContent';
import LoginModal from './components/LoginModal';
import Books from './components/Books';
import { useState } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import RegisterModal from './components/RegisterModal';
import CreateBookModal from './components/CreateBookModal';
// import UpdateBookModal from './components/UpdateBookModal';
import UserProfile from './components/UserProfile';
import BookDetails from './components/BookDetails';
import BlurBg from './components/BlurBg';
import Events from './components/Events';
import TeacherDashboard from './components/TeacherDashboard';
import TeacherSuggestions from './components/TeacherSuggestions';
import WarningModal from './components/WarningModal';
import Calendar from './components/Calendar';


function App() {

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setRegisterOpen] = useState(false);
  const [blurBg, setBlurBg] = useState(false);
  const [isCreateBookOpen, setIsCreateBookOpen] = useState(false)
  const [isWarningModalOpen, setIsWarningModalOpen] = useState(false)

  return (
    <>

      <HashRouter>
        <div className=''>
          <CreateBookModal
            setIsCreateBookOpen={setIsCreateBookOpen}
            isCreateBookOpen={isCreateBookOpen}
            setBlurBg={setBlurBg} />
          <div className='w-full flex justify-center '>
            <LoginModal setLoginOpen={setIsLoginOpen} isLoginOpen={isLoginOpen} setBlurBg={setBlurBg} />
            <RegisterModal setRegisterOpen={setRegisterOpen} isRegisterOpen={isRegisterOpen} setBlurBg={setBlurBg} />
            <WarningModal
              isWarningModalOpen={isWarningModalOpen}
            />
          </div>
          <BlurBg blurBg={blurBg} >
            <Header setLoginOpen={setIsLoginOpen} setRegisterOpen={setRegisterOpen} setBlurBg={setBlurBg} />
            <Routes>
              <Route path="/livros" element={<Books />} />
              <Route path="/" element={<BlogContent />} />
              <Route path="/administrador" element={<Dashboard
                setBlurBg={setBlurBg}
                setIsWarningModalOpen={setIsWarningModalOpen}
                setIsCreateBookOpen={setIsCreateBookOpen}
                isCreateBookOpen={isCreateBookOpen}
              />} />
              <Route path="/perfil" element={<UserProfile />} />
              {/* <Route path="/detalhelivro" element={<BookDetails />} /> */}
              <Route path="/livros/:id" element={<BookDetails />} />
              <Route path="/eventos" element={<Events />} />
              <Route path="/criar-sugestoes" element={<TeacherDashboard />} />
              <Route path="/sugestoes" element={<TeacherSuggestions />} />
              <Route path="/calendario" element={<Calendar />} />
            </Routes>
          </BlurBg>
          <Footer />
        </div>
      </HashRouter>
    </>
  );
}

export default App;
