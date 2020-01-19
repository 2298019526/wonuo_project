<?php
namespace app\admin\controller;
use think\Controller;
use think\Request;
use think\Db;
use think\Session;

class System extends Controller{
    
    public function SystemParam(){
        if(!Session::has('admin')){ //不存在session
            return $this->redirect('admin/login/login');
        }
        return $this->fetch('systemParam');
    }

    public function SystemRewardClass(){
        if(!Session::has('admin')){ //不存在session
            return $this->redirect('admin/login/login');
        }
        return $this->fetch('rewardClass');
    }

    public function SystemSearchLabel(){
        if(!Session::has('admin')){ //不存在session
            return $this->redirect('admin/login/login');
        }
        return $this->fetch('searchLabel');
    }

    public function SystemIndexBanner(){
        if(!Session::has('admin')){ //不存在session
            return $this->redirect('admin/login/login');
        }
        return $this->fetch('indexBanner');
    }
}
