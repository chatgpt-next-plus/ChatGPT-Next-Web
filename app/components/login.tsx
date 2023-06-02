import { useState, useEffect, useMemo, HTMLProps, useRef } from "react";

import EditIcon from "../icons/edit.svg";
import styles from "./login.module.scss";
import CloseIcon from "../icons/close.svg";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import {
  Card,
  Input,
  List,
  ListItem,
  Modal,
  PasswordInput,
  Popover,
  Select,
} from "./ui-lib";
import { ModelConfigList } from "./model-config";

import { IconButton } from "./button";
import { SubmitKey, useChatStore, useAppConfig } from "../store";

import Locale, { AllLangs, changeLang, getLang } from "../locales";
import { copyToClipboard } from "../utils";
import Link from "next/link";
import { Path, UPDATE_URL } from "../constant";
import { ErrorBoundary } from "./error";
import { useNavigate } from "react-router-dom";
import { requestLogin } from "../requests";
import getConfig from "next/config";

export function Login() {
  const navigate = useNavigate();
  const [account, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (event: any) => {
    event.preventDefault();
    // 自定义验证逻辑
    setIsLoading(true);
    // 处理登录逻辑
    //获取当前设备信息
    var agent = navigator.userAgent.toLowerCase();
    console.log(agent);

    const config = getConfig();
    console.log(config);

    console.log(account, password);
    requestLogin(account, password).then((res) => {
      console.log(res);
    });
    setIsLoading(false);
  };

  return (
    <ErrorBoundary>
      <div className="window-header">
        <div className="window-header-title">
          <div className="window-header-main-title">{Locale.User.Title}</div>
          <div className="window-header-sub-title">{Locale.User.SubTitle}</div>
        </div>
        <div className="window-actions">
          <div className="window-action-button">
            <IconButton
              icon={<CloseIcon />}
              onClick={() => navigate(Path.Home)}
              bordered
              title={Locale.Settings.Actions.Close}
            />
          </div>
        </div>
      </div>
      <div className={styles["login"]}>
        <List>
          <Tabs>
            <TabList>
              <Tab>登录</Tab>
              <Tab>注册</Tab>
            </TabList>

            <TabPanel>
              <Card className={styles.customCard}>
                <input type="text" required />
                <form onSubmit={handleLogin}>
                  <ListItem
                  // title= {Locale.User.Form.Account.Title}
                  >
                    <input
                      type="text"
                      value={account}
                      placeholder={Locale.User.Form.Account.Placeholder}
                      onChange={(e) => setEmail(e.target.value)}
                    ></input>
                  </ListItem>

                  <ListItem title={Locale.User.Form.Password.Title}>
                    <PasswordInput
                      value={password}
                      type="text"
                      placeholder={Locale.User.Form.Password.Placeholder}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </ListItem>
                  <ListItem title="">
                    <button type="submit" disabled={isLoading}>
                      {isLoading ? "Loading..." : "Login"}
                    </button>
                  </ListItem>
                </form>
              </Card>
            </TabPanel>
            <TabPanel>
              <ListItem title={Locale.User.Form.Name.Title}>
                <input
                  type="text"
                  placeholder={Locale.User.Form.Name.Placeholder}
                ></input>
              </ListItem>

              <ListItem title={Locale.User.Form.Account.Title}>
                <input
                  type="text"
                  placeholder={Locale.User.Form.Account.Placeholder}
                ></input>
              </ListItem>
              <ListItem title={Locale.User.Form.Password.Title}>
                <PasswordInput
                  // value={accessStore.accessCode}
                  type="text"
                  placeholder={Locale.User.Form.Password.Placeholder}
                  // onChange={(e) => {
                  // accessStore.updateCode(e.currentTarget.value);
                  // }}
                />
              </ListItem>
              <ListItem title="">
                <input
                  type="text"
                  placeholder={Locale.User.Form.Code.PhonePlaceholder}
                ></input>
                <IconButton
                  disabled={isLoading}
                  text={Locale.User.Form.Code.Title}
                  // onClick={() => setShowPromptModal(true)}
                />
              </ListItem>
              <ListItem title={Locale.User.Form.InviteCode.Title}>
                <input
                  type="text"
                  placeholder={Locale.User.Form.InviteCode.Placeholder}
                ></input>
              </ListItem>

              <ListItem title="">
                <IconButton
                  icon={<EditIcon />}
                  text={Locale.User.Register.Button}
                  // onClick={() => setShowPromptModal(true)}
                />
              </ListItem>
            </TabPanel>
          </Tabs>
        </List>
      </div>
    </ErrorBoundary>
  );
}
