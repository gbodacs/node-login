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

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isAdmin: true
    }
  }

  render() {
    return (<div className="Home">
      <Header isAdmin={this.state.isAdmin} history={this.props.history}/>
      <Switch>
        //Admin pages
        <Route path="/home" exact component={AdminDailyPlan}/>
        <Route path="/home/admin_adduser" component={AdminAddUser}/>
        <Route path="/home/admin_getusers" component={AdminGetUsers}/>
        <Route path="/home/admin_dailyplan" component={AdminDailyPlan}/>
        <Route path="/home/admin_exercises" component={AdminExercises}/>
        <Route path="/home/admin_blocks" component={AdminBlocks}/>
        //User pages
        <Route path="/home/user_dailyplan" component={UserDailyplan}/>
      </Switch>
      <Footer/>
    </div>);
  }
}

export default Home;
