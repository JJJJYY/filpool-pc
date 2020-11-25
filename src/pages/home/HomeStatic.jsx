import React from 'react';
import styles from './homeStatus.module.less';
import LazyLoad from 'react-lazyload';
import intl from "react-intl-universal";

import Browser from '@/pages/home/brower/Browser';

export default () => {
    return (
        <div className={`${styles.container}`}>
            {/*视频底部那个*/}
            <div className={`${styles.group} ${styles.group1}`}>
                <div className={`${styles.groupItem1}`}>
                    <div className={`${styles.imgBox}`}>
                        <LazyLoad height={75}>
                            <img src={require('@/images/home/home_icon_ipfs@2x.png')} className={`${styles.img}`} style={{ width: "80px" }} alt="" />
                        </LazyLoad>
                    </div>
                    <div className={`${styles.title}`}>IPFS</div>
                    <div className={`${styles.explain}`}>Inter Planetary File System</div>
                    <div className={`${styles.border}`}></div>
                    <ul className={`${styles.list}`}>
                        <li>{intl.get("homeStatus1")}</li>
                        <li>{intl.get("homeStatus2")}</li>
                    </ul>
                </div>
                <div className={`${styles.groupItem1}`}>
                    <div className={`${styles.imgBox}`}>
                        <LazyLoad height={75}>
                            <img src={require('@/images/home/home_icon_filecoin@2x.png')} className={`${styles.img}`} style={{ width: "80px" }} alt="" />
                        </LazyLoad>
                    </div>
                    <div className={`${styles.title}`}>Filecoin</div>
                    <div className={`${styles.explain}`}>Filecoin</div>
                    <div className={`${styles.border}`}></div>
                    <ul className={`${styles.list}`}>
                        <li>{intl.get("homeStatus3")}</li>
                        <li>{intl.get("homeStatus4")}</li>
                        <li>{intl.get("homeStatus5")}</li>
                        <li>{intl.get("homeStatus6")}</li>
                    </ul>
                </div>
                <div className={`${styles.groupItem1}`}>
                    <div className={`${styles.imgBox}`}>
                        <LazyLoad height={75}>
                            <img src={require('@/images/home/home_icon_percentage@2x.png')} className={`${styles.img}`} style={{ width: "80px" }} alt="" />
                        </LazyLoad>
                    </div>
                    <div className={`${styles.title}`}>{intl.get("homeStatus53")}</div>
                    <div className={`${styles.explain}`}>{intl.get("homeStatus54")}</div>
                    <div className={`${styles.border}`}></div>
                    <ul className={`${styles.list}`}>
                        <li>
                            <span>{intl.get("homeStatus7")}</span>
                            <span className={`${styles.listLabel}`}>5%</span>
                        </li>
                        <li>
                            <span>{intl.get("homeStatus8")}</span>
                            <span className={`${styles.listLabel}`}>10%</span>
                        </li>
                        <li>
                            <span>{intl.get("homeStatus9")}</span>
                            <span className={`${styles.listLabel}`}>15%</span>
                        </li>
                        <li className={`${styles.my}`}>
                            <span>{intl.get("homeStatus10")}</span>
                            <span className={`${styles.listLabel}`}>70%</span>
                        </li>
                    </ul>
                </div>
            </div>
            {/*买币不如挖矿*/}
            <div className={`${styles.group} ${styles.group2}`}>
                <div className={styles.titleBox}>
                    <span>{intl.get("homeStatus11")}</span>
                </div>
                <ul className={styles.list2}>
                    <li className={styles.li}>
                        <span>
                            <LazyLoad height={75}>
                                <img src={require('@/images/home/home_icon_dig.png')} className={`${styles.listImg}`} alt="" />
                            </LazyLoad>
                        </span>
                        <span className={styles.listText}>{intl.get("homeStatus12")}</span>
                    </li>
                    <li className={styles.li}>
                        <span>
                            <LazyLoad height={75}>
                                <img src={require('@/images/home/home_icon_grab.png')} className={`${styles.listImg}`} alt="" />
                            </LazyLoad>
                        </span>
                        <span className={styles.listText}>{intl.get("homeStatus13")}</span>
                    </li>
                    <li className={styles.li}>
                        <span>
                            <LazyLoad height={75}>
                                <img src={require('@/images/home/home_icon_transparent.png')} className={`${styles.listImg}`} alt="" />
                            </LazyLoad>
                        </span>
                        <span className={styles.listText}>{intl.get("homeStatus14")}</span>
                    </li>
                    <li className={styles.li}>
                        <span>
                            <LazyLoad height={75}>
                                <img src={require('@/images/home/home_icon_safety.png')} className={`${styles.listImg}`} alt="" />
                            </LazyLoad>
                        </span>
                        <span className={styles.listText}>{intl.get("homeStatus15")}</span>
                    </li>
                </ul>
                <ul className={styles.list2}>
                    <li className={styles.li}>
                        <span>
                            <LazyLoad height={75}>
                                <img src={require('@/images/home/home_icon_low_consumption.png')} className={`${styles.listImg}`} alt="" />
                            </LazyLoad>
                        </span>
                        <span className={styles.listText}>{intl.get("homeStatus16")}</span>
                    </li>
                    <li className={styles.li}>
                        <span>
                            <LazyLoad height={75}>
                                <img src={require('@/images/home/home_icon_specification.png')} className={`${styles.listImg}`} alt="" />
                            </LazyLoad>
                        </span>
                        <span className={styles.listText}>{intl.get("homeStatus17")}</span>
                    </li>
                    <li className={styles.li}>
                        <span>
                            <LazyLoad height={75}>
                                <img src={require('@/images/home/home_icon_reward.png')} className={`${styles.listImg}`} alt="" />
                            </LazyLoad>
                        </span>
                        <span className={styles.listText}>{intl.get("homeStatus18")}</span>
                    </li>
                    <li className={styles.li}>
                        <span>
                            <LazyLoad height={75}>
                                <img src={require('@/images/home/home_icon_development.png')} className={`${styles.listImg}`} alt="" />
                            </LazyLoad>
                        </span>
                        <span className={styles.listText}>{intl.get("homeStatus19")}</span>
                    </li>
                </ul>
            </div>
            {/*全网算力持续排名第一*/}
            {/*<div className={`${styles.group} ${styles.group3}`}>
                <div className={styles.titleBox}>
                    <span>{intl.get("homeStatus20")}</span>
                    <p className={styles.explain}>{intl.get("homeStatus59")}</p>
                </div>
                <LazyLoad height={75}>
                    <img src="https://filpool.oss-cn-hongkong.aliyuncs.com/image/home_picture_calculate.png" className={styles.img3} alt=""/>
                </LazyLoad>
            </div>*/}
            {/* <div>
                <LazyLoad height={75}>
                    <Browser></Browser>
                </LazyLoad>
            </div> */}
            {/*算力排行下的版块*/}
            {/* <div className={`${styles.group} ${styles.group4}`} style={{ marginTop: "90px" }}>
                <div className={styles.groupItem}>
                    <LazyLoad height={75}>
                        <img src="https://filpool.oss-cn-hongkong.aliyuncs.com/image/home_picture_dig.png" className={styles.img4} alt="" />
                    </LazyLoad>
                    <div className={styles.modalBox}>
                        <div className={styles.textItem} style={{ marginTop: "30px" }}>
                            <p className={styles.normalText}>{intl.get("homeStatus21")}</p>
                            <p className={styles.boldText}>{intl.get("homeStatus22")}</p>
                        </div>
                        <div className={styles.textItem}>
                            <p className={styles.normalText}>{intl.get("homeStatus23")}</p>
                            <p className={styles.boldText}>{intl.get("homeStatus24")}</p>
                        </div>
                        <div className={styles.textItem}>
                            <p className={styles.normalText}>{intl.get("homeStatus56")}</p>
                            <p className={styles.boldText}>{intl.get("homeStatus55")}</p>
                        </div>
                    </div>
                </div>
                <div className={styles.groupItem}>
                    <LazyLoad height={75}>
                        <img src="https://filpool.oss-cn-hongkong.aliyuncs.com/image/home_picture_maintenance.png" className={styles.img4} alt="" />
                    </LazyLoad>
                    <div className={styles.modalBox}>
                        <div className={styles.textItem} style={{ marginTop: "84px" }}>
                            <p className={styles.normalText}>{intl.get("homeStatus25")}</p>
                            <p className={styles.boldText}>{intl.get("homeStatus26")}</p>
                        </div>
                        <div className={styles.textItem}>
                            <p className={styles.normalText}>{intl.get("homeStatus27")}</p>
                            <p className={styles.boldText}>{intl.get("homeStatus28")}</p>
                        </div>
                    </div>
                </div>
                <div className={styles.groupItem}>
                    <LazyLoad height={75}>
                        <img src="https://filpool.oss-cn-hongkong.aliyuncs.com/image/home_picture_smart.png" className={styles.img4} alt="" />
                    </LazyLoad>
                    <div className={styles.modalBox}>
                        <div className={styles.textItem} style={{ marginTop: "84px" }}>
                            <p className={styles.normalText}>{intl.get("homeStatus29")}</p>
                            <p className={styles.boldText}>{intl.get("homeStatus30")}</p>
                        </div>
                        <div className={styles.textItem}>
                            <p className={styles.normalText}>{intl.get("homeStatus31")}</p>
                            <p className={styles.boldText}>{intl.get("homeStatus32")}</p>
                        </div>
                    </div>
                </div>
            </div> */}
            {/*{云算力优势}*/}
            {/* <div className={`${styles.group} ${styles.group5}`}>
                <div className={styles.titleBox} style={{ marginBottom: "100px" }}>
                    <span>{intl.get("homeStatus74")}</span>
                </div>
                <div className={styles.list5}>
                    <div className={`${styles.groupItem5}`}>
                        <div className={`${styles.imgBox5}`}>
                            <LazyLoad height={75}>
                                <img src="https://filpool.oss-cn-hongkong.aliyuncs.com/image/home_picture_technology.png" className={`${styles.img5}`} alt="" />
                            </LazyLoad>
                        </div>
                        <div className={`${styles.title5}`}>{intl.get("homeStatus34")}</div>
                        <div className={`${styles.border}`}></div>
                        <div className={styles.content5}>{intl.get("homeStatus35")}</div>
                    </div>
                    <div className={`${styles.groupItem5}`}>
                        <div className={`${styles.imgBox5}`}>
                            <LazyLoad height={75}>
                                <img src="https://filpool.oss-cn-hongkong.aliyuncs.com/image/home_picture_return.png" className={`${styles.img}`} alt="" />
                            </LazyLoad>
                        </div>
                        <div className={`${styles.title5}`}>{intl.get("homeStatus60")}</div>
                        <div className={`${styles.border}`}></div>
                        <div className={styles.content5}>{intl.get("homeStatus37")}</div>
                    </div>
                    <div className={`${styles.groupItem5}`}>
                        <div className={`${styles.imgBox5}`}>
                            <LazyLoad height={75}>
                                <img src="https://filpool.oss-cn-hongkong.aliyuncs.com/image/home_picture_safety.png" className={`${styles.img}`} alt="" />
                            </LazyLoad>
                        </div>
                        <div className={`${styles.title5}`}>{intl.get("homeStatus61")}</div>
                        <div className={`${styles.border}`}></div>
                        <div className={styles.content5}>{intl.get("homeStatus39")}</div>
                    </div>
                </div>
            </div> */}
            {/*蜘蛛矿机*/}
            {/*<div className={`${styles.group} ${styles.group6} `}>
                <LazyLoad height={75}>
                    <img src={require("@/images/home/homeStatus6.png")} style={{width: "100%"}} alt="" />
                </LazyLoad>
            </div>*/}
            {/* <div className={`${styles.group} ${styles.group6} `}>
                <img src="https://filpool.oss-cn-hongkong.aliyuncs.com/image/home_bg_2.png" className={styles.img6} alt="" />
                <img src="https://filpool.oss-cn-hongkong.aliyuncs.com/image/home_picture_prouduct.png" className={styles.imgMiddle6} alt="" />
                <div className={styles.rightBox}>
                    <div className={styles.rightBoxTop}>
                        <p className={styles.title}>{intl.get("homeStatus71")}</p>
                        <p className={styles.title2}>{intl.get("homeStatus72")}</p>
                        <p className={styles.title3}>{intl.get("homeStatus73")}</p>
                    </div>
                    <ul className={styles.list6}>
                        <li className={styles.li6}>
                            <div className={styles.contentBox}>
                                <img src={require('@/images/home/home_icon_dig_setting@2x.png')} className={styles.listImg} alt="" />
                                <p className={styles.listText}>{intl.get("homeStatus62")}</p>
                            </div>
                            <div className={styles.contentBox}>
                                <img src={require('@/images/home/home_icon_custom@2x.png')} className={styles.listImg} alt="" />
                                <p className={styles.listText}>{intl.get("homeStatus63")}</p>
                            </div>
                            <div className={styles.contentBox}>
                                <img src={require('@/images/home/home_icon_cpu@2x.png')} className={styles.listImg} alt="" />
                                <p className={styles.listText}>{intl.get("homeStatus64")}</p>
                            </div>
                        </li>
                        <li className={styles.li6}>
                            <div className={styles.contentBox}>
                                <img src={require('@/images/home/home_icon_hard_disk@2x.png')} className={styles.listImg} alt="" />
                                <p className={styles.listText}>{intl.get("homeStatus65")}</p>
                            </div>
                            <div className={styles.contentBox}>
                                <img src={require('@/images/home/home_icon_smart@2x.png')} className={styles.listImg} alt="" />
                                <p className={styles.listText}>{intl.get("homeStatus66")}</p>
                            </div>
                            <div className={styles.contentBox}>
                                <div className={styles.listImgBox}>
                                    <img src={require('@/images/home/home_icon_gpu@2x.png')} className={styles.listImg} style={{ marginBottom: "0" }} alt="" />
                                </div>
                                <p className={styles.listText}>{intl.get("homeStatus67")}</p>
                            </div>
                        </li>
                        <li className={styles.li6}>
                            <div className={styles.contentBox}>
                                <img src={require('@/images/home/home_icon_idc@2x.png')} className={styles.listImg} alt="" />
                                <p className={styles.listText}>{intl.get("homeStatus68")}</p>
                            </div>
                            <div className={styles.contentBox}>
                                <img src={require('@/images/home/home_icon_safety@2x.png')} className={styles.listImg} alt="" />
                                <p className={styles.listText}>{intl.get("homeStatus69")}</p>
                            </div>
                            <div className={styles.contentBox}>
                                <img src={require('@/images/home/home_icon_time@2x.png')} className={styles.listImg} alt="" />
                                <p className={styles.listText}>{intl.get("homeStatus70")}</p>
                            </div>
                        </li>
                        <li className={styles.li6}>
                            <img src={require('@/images/home/home_icon_custom.png')} className={styles.listImg} alt=""/>
                            <p className={styles.listText}>{intl.get("homeStatus44")}</p>
                        </li>
                        <li className={styles.li6}>
                            <img src={require('@/images/home/home_icon_cpu.png')} className={styles.listImg} alt=""/>
                            <p className={styles.listText}>{intl.get("homeStatus45")}</p>
                            <p className={styles.listText}>{intl.get("homeStatus46")}</p>
                        </li>
                        <li className={styles.li6}>
                            <img src={require('@/images/home/home_icon_hard_disk.png')} className={styles.listImg} alt=""/>
                            <p className={styles.listText}>{intl.get("homeStatus47")}</p>
                            <p className={styles.listText}>{intl.get("homeStatus48")}</p>
                        </li>
                    </ul>
                </div>
            </div> */}
            {/*合作伙伴*/}
            {/*<div className={styles.group7}>
                <h3 className={styles.title}>{intl.get("homeStatus49")}</h3>
                <ul className={styles.list}>
                    {
                        [1,2,3,4,5,6,7,8].map((item) => {
                            return (
                                <li className={styles.li}>
                                    <LazyLoad height={75}>
                                        <img src={require(`@/images/home/home_partners_${item}.png`)} className={`${styles.listImg}`} alt="" />
                                    </LazyLoad>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>*/}
            {/*<LazyLoad height={75}>
                <img src={require('@/images/home/home_picture_2.png')} className={`${styles.bgImg}`} style={{right: "", top: "710px"}} alt="" />
            </LazyLoad>*/}
            <LazyLoad height={75}>
                <img src={require('@/images/home/home_picture_1.png')} className={`${styles.bgImg}`} style={{ left: "-170px", bottom: "1000px" }} alt="" />
            </LazyLoad>
            {/*<LazyLoad height={75}>
                <img src={require('@/images/home/home_picture_2.png')} className={`${styles.bgImg}`} style={{right: "-210px", bottom: "-180px"}} alt="" />
            </LazyLoad>*/}
        </div>
    )
}