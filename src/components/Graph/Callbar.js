import React from 'react';
import $ from 'jquery';
import Bar from './ฺBar'
import '../../bulma.css';

export default class Callbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = { call: false };
        this.closeModal = this.closeModal.bind(this);

    }
    componentDidMount() {
        const now = this;
        $.ajax({
            url: 'http://127.0.0.1:5000/data?arg1=bar_cat',
            type: "GET",
            dataType: 'json',
            success: function (res) {
                now.setState(state => ({
                    bar: res
                }))
            }
        });
    }
    closeModal(name) {
        $(name).removeClass("is-active");
      }


    render() {
        return (
            <div id='bar'>
                {this.state.bar && this.state.bar.Values.map((d, i) => {
                    var keys = Object.keys(d)[0];
                    var data = d[keys];
                    return (
                        <div id={'bar__' + i} class="modal">
                            <div class="modal-background"></div>
                            <div class="modal-content">
                                <section class="modal-card-body">
                                    <div id={'bar_' + i} className='box'>
                                        <Bar key={i} data={data} name={keys} graphid={'bar_' + i} />
                                    </div>
                                    <div className='box'>
                                        <h4>{this.state.bar.Descriptions[i][keys]}</h4>
                                    </div>
                                </section>
                            </div>
                            <button class="modal-close is-large" aria-label="close" onClick={() => this.closeModal('#bar__' + i)}></button>
                        </div>
                    )
                })}
            </div>
        );
    }
}
/*
<div className='columns is-centered'>
                            <div className='column is-9'>
                                <div id={'bar_' + i} className='box'>
                                    <Bar key={i} data={data} name={keys} graphid={'bar_' + i} />
                                </div>
                            </div>
                            <div className='column is-2'>
                                <div className='box'>
                                    <h4>{this.state.bar.Descriptions[i][keys]}</h4>
                                </div>
                            </div>
                        </div>
*/