import { laLiga, epl, bundesliga, serieA, ligueOne } from './backend/data';
import { CommonLeague } from './components/CommonLeague';
import { GlobalStyle } from './GlobalStyle';
import st from 'styled-components';
import { Switch, Route, Redirect } from 'react-router-dom';
import laLigaLogo from './assets/la-liga.png';
import eplLogo from './assets/epl.png';
import serieALogo from './assets/seriea.png';
import ligue1Logo from './assets/ligue1.png';
import bundesligaLogo from './assets/bundesliga.png';
import { Navbar } from './components/NavBar';
import { UCLView } from './components/UCLView';

const AppContainer = st.div`
  position: absolute;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
`;

export const App = () => {

  return (
    <>
    <GlobalStyle />
    <AppContainer>
      <Navbar />
      <Switch>
        <Route exact path='/laliga' render={() => <CommonLeague league={laLiga} logo={laLigaLogo} topTier={4}/>} />
        <Route exact path='/epl' render={() => <CommonLeague league={epl} logo={eplLogo} topTier={4}/>} />
        <Route exact path='/bundesliga' render={() => <CommonLeague league={bundesliga} logo={bundesligaLogo} topTier={3}/>} />
        <Route exact path='/ligue1' render={() => <CommonLeague league={ligueOne} logo={ligue1Logo} topTier={3}/>} />
        <Route exact path='/seriea' render={() => <CommonLeague league={serieA} logo={serieALogo} topTier={4}/>} />
        <Route exact path='/ucl' render={() => <UCLView />} />
        <Route render={() => <Redirect to='/epl' />} />
      </Switch>
    </AppContainer>
    </>
  );
};