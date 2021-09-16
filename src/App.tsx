
import { SideBar } from './components/SideBar';
import { Content } from './components/Content';


import './styles/global.scss';

import './styles/sidebar.scss';
import './styles/content.scss';
import { MovieContextProvider } from './Context/ApiContext';


export function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <MovieContextProvider>
        <SideBar />
        <Content />   
      </MovieContextProvider>  
    </div>
  )
}