import React from 'react';
import styles from './actual.module.less';
import net from '@/net';

export default class Upload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loadImgUrl: "",
            token: '',
            file: null,
        }
    }

    loadToken() {
        return new Promise((resolve, reject) => {
            net.getToken().then((res) => {
                if (res.ret == 200) {
                    this.setState({ token: res.data })
                    resolve(res.data);

                } else {
                    reject();
                }
            })
        })
    }
    componentWillUnmount = () => {
        this.setState = (state, callback) => {
            return;
        };
    }
    uploadImg(file, token) {
        net.postUpload({
            file: file,
            token: token,
        }).then((res) => {
            if (res.status == 200) {
                this.setState({ loadImgUrl: res.data.key, file: file });
                this.props.onChange(res.data.key);
            }
        })
    }

    onChange(event) {
        if (event.target.files && event.target.files.length === 0) {
            return;
        }
        const { token } = this.state;
        let file = event.target.files[0];
        if (!token) {
            this.loadToken().then((token) => {
                this.uploadImg(file, token)
            })
        } else {
            this.uploadImg(file, token)
        }
    }

    render() {
        const { file } = this.state;
        return (
            <div className={styles.uploadBox}>
                <img src={file ? URL.createObjectURL(file) : this.props.bgImg} className={styles.bg} alt="" />
                <p className={styles.text}>{this.props.text}</p>
                <div className={styles.uploadButtonBox}>
                    <button className={styles.uploadButton}>上传</button>
                    <input type="file" accept="image/*" className={styles.uploadInput} onChange={(event) => this.onChange(event)} />
                </div>
            </div>
        )
    }
}