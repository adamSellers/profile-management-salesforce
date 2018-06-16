// Copyright 2018, Adam Sellers - Sales Engineering, Salesforce.com Inc.
// All rights reserved.
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are met:
//
// - Redistributions of source code must retain the above copyright notice,
//   this list of conditions and the following disclaimer.
// - Redistributions in binary form must reproduce the above copyright notice,
//   this list of conditions and the following disclaimer in the documentation
//   and/or other materials provided with the distribution.
// - Neither the name of the salesforce.com nor the names of its contributors
//   may be used to endorse or promote products derived from this software
//   without specific prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
// AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
// IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
// DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE
// FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
// DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
// SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
// CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
// OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
// OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
// *********************************************************************************/
// This is the Header component, it is going to control the login/logout logic
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


export class Header extends Component {
    // helper method to render content based on auth
    renderLogin() {
        switch (this.props.auth) {
            case null:
                return null;
            case false:
                return [
                    <li className="collection-item" key="1"><a href="/auth/salesforce">Login</a></li>
                ]
            default:
                return [
                    <li className="collection-item" key="1" style={ {margin: '0 10px'} }>Welcome {this.props.auth.firstname}!</li>,
                    <li className="collection-item" key="2"><a href="/api/logout">Logout</a></li>
                ]
        }
    }

    // render method begins here
    render() {
        return (
            <nav>
                <div className="nav-wrapper teal">
                    <Link to={this.props.auth ? '/profile': '/'} className="left brand-logo">Profile App</Link>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        {this.renderLogin()}
                    </ul>
                </div>
            </nav>   
        )
    };
};

// have to map the state to props to use redux state
function mapStateToProps({auth}) {
    return { auth };
};

export default connect(mapStateToProps)(Header);