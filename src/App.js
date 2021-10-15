import Header from './Components/Header';
import './App.css';
import Feed from './Components/Feed';

function App() {
  return (
    <div className="bg-gray-50 h-screen overflow-y-scroll scrollbar-hide">
      
      {/* Header */}
      <Header />

      {/* Feed */}
      <Feed />

      {/* Modal */}

    </div>
  );
}

export default App;
