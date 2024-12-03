import {
  account_buyitem,
  account_changepass,
  account_check,
  account_getnotif,
  account_info,
  account_login,
  account_register,
  account_unsubscribe,
  delete_account,
  get_metadata,
  create_or_update_metadata,
} from "./Account";
import Boards from "./Boards";
import Pages from "./Pages";
import Blog from "./Blog";
import Product from "./Product";
import Merch from "./Merchs";
import CommentShop from "./CommentShop";
import Commentblog from "./CommentBlog";
import Download from "./Download";
import Message from "./Message";
import Content from "./Content";
import Ads from "./Ads";
import {
  account_reset,
  account_resetCheck,
  account_resetConfirm,
} from "./ResetPass";
import Auth from "./Auth";
import Features from "./Features";
import Research from "./Research";

const Account = {
  auth: Auth,
  register: account_register,
  login: account_login,
  checkToken: account_check,
  getInfo: account_info,
  deleteAccount: delete_account,
  changePassword: account_changepass,
  buyItem: account_buyitem,
  notif: account_getnotif,
  unsub: account_unsubscribe,
  reset: {
    reset: account_reset,
    check: account_resetCheck,
    confirm: account_resetConfirm,
  },
  board: Boards,
  page: Pages,
  blog: Blog,
  shop: Product,
  features: Features,
  merch: Merch,
  download: Download,
  message: Message,
  content: Content,
  userMeta: {
    get: get_metadata,
    createOrUpdate: create_or_update_metadata,
  },
  ads: Ads,
  research: Research,
  comment: {
    shop: CommentShop,
    blog: Commentblog,
  },
};

export default Account;
