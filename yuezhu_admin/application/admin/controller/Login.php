<?php
namespace app\admin\controller;
use think\Controller;
use think\Db;
use think\Session;

class Login extends Controller{
    
    public function login()
    {
        return $this->fetch();
    }

    public function loginCheck(){
        $name = $_POST['admin_name'];
        $pwd = $_POST['admin_pwd'];

        $result = Db::query('select * from yuezhu_admin where admin_name="'.$name.'" and admin_pwd=md5("'.$pwd.'")');
        if(count($result)>0){
            Session::set('admin',$name);
            return array('code'=>'0','msg'=>'登录成功','data'=>array());
        }else{
            return array('code'=>'1','msg'=>'用户名或密码错误','data'=>array());
        }
    }
}
