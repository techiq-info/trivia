<div style="word-wrap:break-word;line-break:after-white-space">
	<table border="0" cellspacing="0" cellpadding="0" width="490" style="font-family:Roboto,RobotoDraft,Helvetica,Arial,sans-serif;font-size:13px">
		<tbody>
			<tr>
				<td valign="top" align="left">
					<font face="Arial, Helvetica, sans-serif" style="line-height:18px">Dear <?php echo $data['FirstName'];?> <?php echo $data['LastName'];?></font>
					<p>
						Congratulations..
					</p>
				</td>
			</tr>
			<tr>
				<td valign="top" align="left" style="text-align:justify;padding-top:8px">
				<p>
					Your training for Point of Sale Person is completed. Please <a href="<?php echo $data['url']; ?>" target="_blank">Click Here</a> to Download Training Certificate.
				</p>
				<p>
					Now you can start selling all the insurance products with <?php echo config('constant.COMPANY_NAME') ?> For any support or assistance pls get in touch with our representative on <?php echo config('constant.CONTACTUS_EMAIL') ?>.
				</p><br>
				<p>Happy Selling</p>
				<p><?php echo config('constant.EMAIL_SIGN') ?></p><br/>
				</td>
			</tr>
		</tbody>
	</table>
</div>