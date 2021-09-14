@extends('layouts.website')
@section('page-content')
<section>
    <div class="container mt-5">
         
            
        <div class="d-flex justify-content-center row">
            <div class="col-md-10 col-lg-10">
                <div class="border">
                    <div class="question bg-white p-3 border-bottom">
                        <div class="d-flex flex-row justify-content-between align-items-center mcq">
                            <h4>Thank You</h4>
                        </div>
                    </div>
                    <div class="question bg-white p-3 border-bottom">

        Total Question  : <?php echo $totalquestions;?>
        Correct Answer  : <?php echo $correctans;?>
        Wrong Answer  : <?php echo $wrongans;?>


                        <table>
                            <tr style="background:blue;color:#fff;">
                            <th>Question</th>
                            <th>Given Answer</th>
                            <th>Correct Answer</th>
                            <th>Status</th>
</tr>




                    <?php $i=1;?>
                        @foreach($results as $result)
                        <tr>

                            <?php 
                            $color = "Red";
                            if($result["status"] == "Correct"){
                                $color = "Green";
                            }?>

                                <td>Q<?php echo $i; $i++;?>.<?php echo $result["question"];?></td>
                                <td><?php echo $result["answergiven"];?></td>
                                <td><?php echo $result["answer"];?></td>
                                <td  style="background:<?php echo $color;?>"><?php echo $result["status"];?></td>
                                


                            
</tr>
                        @endforeach
                        </table>
                    </div>

                </div>
            </div>
        </div>

    </div>
</section>
@endsection