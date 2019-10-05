import React from 'react';
import './home.scss';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import { Switch, Route } from 'react-router-dom';
import AdminAddUser from '../../components/admin_adduser/admin_adduser';
import AdminGetUsers from '../../components/admin_getusers/admin_getusers';
import AdminDailyPlan from '../../components/admin_dailyplan/admin_dailyplan';
import AdminExercises from '../../components/admin_exercises/admin_exercises';
import AdminBlocks from '../../components/admin_blocks/admin_blocks';

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isAdmin: true
    }
  }

  render() {
    return (
      <div className="Home">
        <Header isAdmin={this.state.isAdmin} />
        <Switch>
          <Route path="/home" exact component={ AdminDailyPlan } />
          <Route path="/home/admin_adduser" exact component={ AdminAddUser } />
          <Route path="/home/admin_getusers" exact component={ AdminGetUsers } />
          <Route path="/home/admin_dailyplan" exact component={ AdminDailyPlan } />
          <Route path="/home/admin_exercises" exact component={ AdminExercises } />
          <Route path="/home/admin_blocks" exact component={ AdminBlocks } />
        </Switch>
        <Footer />
      </div>

    );
  }
}

export default Home;
