<!DOCTYPE html>
<html>
<head>
    <title>信贷风险评估系统 | 评估指标</title>
    <?php require_once "../../php/common.php"; ?>
    <?php require_once "components/css.php"; ?>
    <!-- BEGIN PAGE LEVEL STYLES -->
    <link rel="stylesheet" type="text/css" href="assets/global/plugins/select2/select2.css"/>
    <link rel="stylesheet" type="text/css" href="assets/global/plugins/datatables/extensions/Scroller/css/dataTables.scroller.min.css"/>
    <link rel="stylesheet" type="text/css" href="assets/global/plugins/datatables/extensions/ColReorder/css/dataTables.colReorder.min.css"/>
    <link rel="stylesheet" type="text/css" href="assets/global/plugins/datatables/plugins/bootstrap/dataTables.bootstrap.css"/>
    <!-- END PAGE LEVEL STYLES -->
</head>
<body class="page-header-fixed page-quick-sidebar-over-content page-sidebar-closed-hide-logo page-container-bg-solid">
<div class="page-header -i navbar navbar-fixed-top">
    <div class="page-header-inner">
        <?php require_once "components/logo.php"; ?>
        <div class="top-menu">
            <ul class="nav navbar-nav pull-right">
                <?php require_once "components/notification.php"; ?>
                <?php require_once "components/inbox.php"; ?>
                <?php require_once "components/todo.php"; ?>
                <?php require_once "components/login.php"; ?>
                <?php require_once "components/quick.php"; ?>
            </ul>
        </div>
    </div>
</div>
<div class="clearfix"></div>
<div class="page-container">
    <?php echo curl("http://localhost/projects/telecom/components/sidebar.php?menu=1&sub=0"); ?>
    <!-- BEGIN CONTENT -->
    <div class="page-content-wrapper">
        <div class="page-content">
            <h3 class="page-title">
                评估指标
                <small>查询评估指标详情</small>
            </h3>
            <div class="row">
                <div class="portlet light">
                    <div>
                        <input type="text" class="form-control" placeholder="搜索...">
                        <a data-toggle="modal" href="#upload" class="btn blue" style="float:right;"> <i class="fa fa-file-o"></i> 上传 CSV 文档 </a>
                    </div>
                    <!-- BEGIN EXAMPLE TABLE PORTLET-->
                    <div style="margin-top:90px;">
                        <table class="table table-striped table-bordered table-hover" id="sample_1">
                            <thead>
                            <tr>
                                <th><span class="font-red">用户 ID</span></th>
                                <th><span class="font-blue">社交质量评分</span></th>
                                <th><span class="font-blue">消费意愿评分</span></th>
                                <th><span class="font-blue">还款能力评分</span></th>
                                <th><span class="font-green">移动模式</span></th>
                                <th><span class="font-green">消费偏好</span></th>
                                <th><span class="font-red">信贷风险评分</span></th>
                                <th>操作</th>
                            </tr>
                            </thead>
                            <tbody>
                            <?php for ($i = 1; $i < 10; $i++) { ?>
                                <tr>
                                    <td><?php echo rand(10000000, 99999999); ?></td>
                                    <td>37.26</td>
                                    <td>55.43</td>
                                    <td>77.21</td>
                                    <td>商旅、朝九晚五</td>
                                    <td>吃货</td>
                                    <td><a class="label label-success" data-toggle="modal" href="#result">98.75</a></td>
                                    <td><a class="label label-default" data-toggle="modal" href="#basic">查看详情</a></td>
                                </tr>
                                <tr>
                                    <td><?php echo rand(10000000, 99999999); ?></td>
                                    <td>24.26</td>
                                    <td>43.43</td>
                                    <td>34.21</td>
                                    <td>商旅、深夜加班</td>
                                    <td>吃货、败家</td>
                                    <td><a class="label label-success" data-toggle="modal" href="#result">88.12</a></td>
                                    <td><a class="label label-default" data-toggle="modal" href="#basic">查看详情</a></td>
                                </tr>
                                <tr>
                                    <td><?php echo rand(10000000, 99999999); ?></td>
                                    <td>67.26</td>
                                    <td>23.43</td>
                                    <td>15.21</td>
                                    <td>本地、朝九晚五</td>
                                    <td>败家、奢侈品</td>
                                    <td><a class="label label-warning" data-toggle="modal" href="#result">55.75</a></td>
                                    <td><a class="label label-default" data-toggle="modal" href="#basic">查看详情</a></td>
                                </tr>
                                <tr>
                                    <td><?php echo rand(10000000, 99999999); ?></td>
                                    <td>37.12</td>
                                    <td>55.43</td>
                                    <td>77.33</td>
                                    <td>本地、朝九晚五</td>
                                    <td>吃货、淘宝一族</td>
                                    <td><a class="label label-danger" data-toggle="modal" href="#result">27.25</a></td>
                                    <td><a class="label label-default" data-toggle="modal" href="#basic">查看详情</a></td>
                                </tr>
                                <tr>
                                    <td><?php echo rand(10000000, 99999999); ?></td>
                                    <td>76.21</td>
                                    <td>55.44</td>
                                    <td>77.21</td>
                                    <td>商旅、朝九晚五</td>
                                    <td>吃货</td>
                                    <td><a class="label label-warning" data-toggle="modal" href="#result">66.75</a></td>
                                    <td><a class="label label-default" data-toggle="modal" href="#basic">查看详情</a></td>
                                </tr>
                            <?php } ?>
                            </tbody>
                        </table>
                    </div>
                    <!-- END EXAMPLE TABLE PORTLET-->
                </div>
            </div>
            <div class="clearfix"></div>
            <div class="row">
                <div class="modal fade" id="upload" tabindex="-1" role="basic" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                                <h4 class="modal-title">上传 CSV 文档</h4>
                            </div>
                            <div class="modal-body">
                                <div><a href="javascript:;" class="btn green"> 选择文件 <i class="fa fa-plus"></i></a></div>
                                <div style="margin-top:10px;width:100%;">
                                    <textarea style="width:100%;height:200px;">
                                        <?php for ($i = 1; $i < 100; $i++) {
                                            echo rand(10000000, 99999999) . "\n";
                                        } ?>
                                    </textarea></div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn default" data-dismiss="modal">确定</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="clearfix"></div>
            <div class="row">
                <div class="modal fade" id="result" tabindex="-1" role="basic" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                                <h4 class="modal-title">用户 ID：12345678</h4>
                            </div>
                            <div class="modal-body">
                                <div id="chart_8" class="chart" style="height:400px;width:568px;"></div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn default" data-dismiss="modal">确定</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="clearfix"></div>
            <div class="row">
                <div class="modal fade" id="basic" tabindex="-1" role="basic" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                                <h4 class="modal-title">用户 ID：12345678</h4>
                            </div>
                            <div class="modal-body">
                                <h4 class="bg-green" style="padding:5px;">社交质量评分</h4>

                                <div style="margin-top:3px;">
                                    <div class="font-green" style="width:109px;display:inline-block;">通讯录广度：</div>
                                    <div class="progress" style="width:455px;display:inline-block;margin-bottom:0;height:18px;vertical-align:top;">
                                        <div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width: 40%"></div>
                                    </div>
                                </div>
                                <div style="margin-top:3px;">
                                    <div class="font-green" style="width:109px;display:inline-block;">通讯录质量：</div>
                                    <div class="progress" style="width:455px;display:inline-block;margin-bottom:0;height:18px;vertical-align:top;">
                                        <div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width: 75%"></div>
                                    </div>
                                </div>
                                <div style="margin-top:3px;">
                                    <div class="font-green" style="width:109px;display:inline-block;">社交应用情况：</div>
                                    <div class="progress" style="width:455px;display:inline-block;margin-bottom:0;height:18px;vertical-align:top;">
                                        <div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width: 21%"></div>
                                    </div>
                                </div>
                                <h4 class="bg-blue" style="padding:5px;">消费意愿评分</h4>

                                <div style="margin-top:3px;">
                                    <div class="font-blue" style="width:109px;display:inline-block;">电信服务消费：</div>
                                    <div class="progress" style="width:455px;display:inline-block;margin-bottom:0;height:18px;vertical-align:top;">
                                        <div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width: 40%"></div>
                                    </div>
                                </div>
                                <div style="margin-top:3px;">
                                    <div class="font-blue" style="width:109px;display:inline-block;">消费验证短信：</div>
                                    <div class="progress" style="width:455px;display:inline-block;margin-bottom:0;height:18px;vertical-align:top;">
                                        <div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width: 75%"></div>
                                    </div>
                                </div>
                                <div style="margin-top:3px;">
                                    <div class="font-blue" style="width:109px;display:inline-block;">主动联系服务：</div>
                                    <div class="progress" style="width:455px;display:inline-block;margin-bottom:0;height:18px;vertical-align:top;">
                                        <div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width: 21%"></div>
                                    </div>
                                </div>
                                <div style="margin-top:3px;">
                                    <div class="font-blue" style="width:109px;display:inline-block;">经常出入场所：</div>
                                    <div class="progress" style="width:455px;display:inline-block;margin-bottom:0;height:18px;vertical-align:top;">
                                        <div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width: 40%"></div>
                                    </div>
                                </div>
                                <h4 class="bg-red" style="padding:5px;">还款能力评分</h4>

                                <div style="margin-top:3px;">
                                    <div class="font-red" style="width:109px;display:inline-block;">理财机构通讯：</div>
                                    <div class="progress" style="width:455px;display:inline-block;margin-bottom:0;height:18px;vertical-align:top;">
                                        <div class="progress-bar progress-bar-danger" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width: 40%"></div>
                                    </div>
                                </div>
                                <div style="margin-top:3px;">
                                    <div class="font-red" style="width:109px;display:inline-block;">话费拖欠与充值：</div>
                                    <div class="progress" style="width:455px;display:inline-block;margin-bottom:0;height:18px;vertical-align:top;">
                                        <div class="progress-bar progress-bar-danger" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width: 75%"></div>
                                    </div>
                                </div>
                                <div style="margin-top:3px;">
                                    <div class="font-red" style="width:109px;display:inline-block;">住址及工作地点：</div>
                                    <div class="progress" style="width:455px;display:inline-block;margin-bottom:0;height:18px;vertical-align:top;">
                                        <div class="progress-bar progress-bar-danger" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width: 21%"></div>
                                    </div>
                                </div>
                                <h4 class="bg-yellow" style="padding:5px;">用户标签</h4>

                                <div style="margin-top:3px;">
                                    <div class="font-yellow" style="width:109px;display:inline-block;">移动模式：</div>
                                    <a class="label label-warning" data-toggle="modal" href="#result">商旅</a>
                                    <a class="label label-default" data-toggle="modal" href="#result">朝九晚五</a>
                                    <a class="label label-warning" data-toggle="modal" href="#result">深夜加班</a>
                                </div>
                                <div style="margin-top:10px;">
                                    <div class="font-yellow" style="width:109px;display:inline-block;">消费偏好：</div>
                                    <a class="label label-warning" data-toggle="modal" href="#result">吃货</a>
                                    <a class="label label-default" data-toggle="modal" href="#result">败家</a>
                                    <a class="label label-warning" data-toggle="modal" href="#result">奢侈品</a>
                                    <a class="label label-default" data-toggle="modal" href="#result">淘宝一族</a>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn default" data-dismiss="modal">确定</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- END CONTENT -->
</div>
<?php require_once "components/footer.php"; ?>
<!-- BEGIN JAVASCRIPTS(Load javascripts at bottom, this will reduce page load time) -->
<?php require_once "components/js.php"; ?>
<!-- BEGIN PAGE LEVEL PLUGINS -->
<script type="text/javascript" src="assets/global/plugins/select2/select2.min.js"></script>
<script type="text/javascript" src="assets/global/plugins/datatables/media/js/jquery.dataTables.min.js"></script>
<script type="text/javascript" src="assets/global/plugins/datatables/extensions/TableTools/js/dataTables.tableTools.min.js"></script>
<script type="text/javascript" src="assets/global/plugins/datatables/extensions/ColReorder/js/dataTables.colReorder.min.js"></script>
<script type="text/javascript" src="assets/global/plugins/datatables/extensions/Scroller/js/dataTables.scroller.min.js"></script>
<script type="text/javascript" src="assets/global/plugins/datatables/plugins/bootstrap/dataTables.bootstrap.js"></script>
<script src="assets/global/plugins/amcharts/amcharts/amcharts.js" type="text/javascript"></script>
<script src="assets/global/plugins/amcharts/amcharts/serial.js" type="text/javascript"></script>
<script src="assets/global/plugins/amcharts/amcharts/pie.js" type="text/javascript"></script>
<script src="assets/global/plugins/amcharts/amcharts/radar.js" type="text/javascript"></script>
<script src="assets/global/plugins/amcharts/amcharts/themes/light.js" type="text/javascript"></script>
<script src="assets/global/plugins/amcharts/amcharts/themes/patterns.js" type="text/javascript"></script>
<script src="assets/global/plugins/amcharts/amcharts/themes/chalk.js" type="text/javascript"></script>
<script src="assets/global/plugins/amcharts/ammap/ammap.js" type="text/javascript"></script>
<script src="assets/global/plugins/amcharts/ammap/maps/js/worldLow.js" type="text/javascript"></script>
<script src="assets/global/plugins/amcharts/amstockcharts/amstock.js" type="text/javascript"></script>
<!-- END PAGE LEVEL PLUGINS -->
<!-- BEGIN PAGE LEVEL SCRIPTS -->
<script src="assets/global/scripts/metronic.js" type="text/javascript"></script>
<script src="assets/admin/layout/scripts/layout.js" type="text/javascript"></script>
<script src="assets/admin/layout/scripts/quick-sidebar.js" type="text/javascript"></script>
<script src="assets/admin/layout/scripts/demo.js" type="text/javascript"></script>
<script src="assets/admin/pages/scripts/table-advanced.js"></script>
<script src="assets/admin/pages/scripts/charts-amcharts.js"></script>
<script>
    jQuery(document).ready(function () {
        Metronic.init(); // init metronic core components
        Layout.init(); // init current layout
        QuickSidebar.init(); // init quick sidebar
        Demo.init(); // init demo features
        TableAdvanced.init();
        ChartsAmcharts.init(); // init demo charts
    });
</script>
<!-- END PAGE LEVEL SCRIPTS -->
<!-- END JAVASCRIPTS -->
</body>
</html>