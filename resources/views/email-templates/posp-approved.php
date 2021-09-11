<div style="word-wrap:break-word;line-break:after-white-space">
	<table border="0" cellspacing="0" cellpadding="0" width="490" style="font-family:Roboto,RobotoDraft,Helvetica,Arial,sans-serif;font-size:13px">
		<tbody>
			<tr>
				<td valign="top" align="left">
					<font face="Arial, Helvetica, sans-serif" style="line-height:18px">Dear <?php echo $data['FirstName'];?> <?php echo $data['LastName'];?></font>
					<p>
						Congratulations !!!!
					</p>
				</td>
			</tr>
			<tr>
				<td valign="top" align="left" style="text-align:justify;padding-top:8px">
				<p>
					Your application is approved and you will be informed shortly about the next course of action.
				</p>
				
				<p><?php echo config('constant.EMAIL_SIGN') ?></p><br/>
				</td>
			</tr>
		</tbody>
	</table>
</div>