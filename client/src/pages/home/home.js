import React from 'react';
import './home.scss';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import {Switch, Route} from 'react-router-dom';
import AdminAddUser from '../../components/admin_adduser/admin_adduser';
import AdminGetUsers from '../../components/admin_getusers/admin_getusers';
import AdminDailyPlan from '../../components/admin_dailyplan/admin_dailyplan';
import AdminExercises from '../../components/admin_exercises/admin_exercises';
import AdminBlocks from '../../components/admin_blocks/admin_blocks';
import UserDailyplan from '../../components/user_dailyplan/user_dailyplan';
import UserHistory from '../../components/user_history/user_history';
import VideoViewer from '../../components/video_viewer/video_viewer';

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isAdmin: false
    }
  }

  render() {
    return (<div className="Home">
      <Header isAdmin={this.state.isAdmin} history={this.props.history}/>
      <Switch>
        //Admin pages
        <Route path="/home" exact="exact" component={AdminDailyPlan}/>
        <Route path="/home/admin_adduser" exact="exact" component={AdminAddUser}/>
        <Route path="/home/admin_getusers" exact="exact" component={AdminGetUsers}/>
        <Route path="/home/admin_dailyplan" exact="exact" component={AdminDailyPlan}/>
        <Route path="/home/admin_exercises" exact="exact" component={AdminExercises}/>
        <Route path="/home/admin_blocks" exact="exact" component={AdminBlocks}/>
        //User pages
        <Route path="/home/user_dailyplan" exact="exact" component={UserDailyplan}/>
        <Route path="/home/user_history" exact="exact" component={UserHistory}/>
        <Route path="/home/video_viewer" exact="exact" component={VideoViewer}/>
      </Switch>
      <Footer/>
    </div>);
  }
}

export default Home;
