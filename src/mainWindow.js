// double acceleration, brakeforce, pushforce, netforce, power;
// double speed;
// double value=0;
// static double calculate_interval_ms = 100;//tested 100
// double distance = 0;
// double executionTime = 0;
// double weight = 1400;
// double speedGain = 1.0;
// int step_count = 0;
// double cx;
// double rolling_resistance;
// static bool b = false;
// static bool c = false;
// bool interval = false;
// static int[] tor;
// int maxrpm;
// double maxgearlength;
// int currentRpm;
// double maxg;

function startButtonClick()
{
    readFile();
   // power = 700;
    power = Convert.ToDouble(zdenko.Text);
    weight = Convert.ToDouble(weightbox.Text);
    speed = Convert.ToDouble(initialspeedbox.Text)/3.6;
    cx = Convert.ToDouble(cxbox.Text);
    rolling_resistance = Convert.ToDouble(rolresbox.Text);
    maxgearlength = Convert.ToDouble(maxgearlenbox.Text)/3.6;
    maxg = Convert.ToDouble(maxgbox.Text);
    distance = 0;
    executionTime = 0;
    value = 0;
    //newfilename = zdenko.Text + weightbox.Text + DateTime.Now.ToString();
    if (speed > 30) // v m/s
        b = true;//to da ne izpisuje 0-100kmh če je začetna hitrost večja od 30 m/s

    if (onegear.IsChecked == true)
    {
        if (all_combinations_checkbox.IsChecked == true)
        {
            //ok initila speed že imamo??
            //distance treba ročno naštimat
            topspeedMin = (topspeed_min)/3.6;
            topspeedMax = (topspeed_max)/3.6;//oboje damo v m/s
        }

        else//one gear is NOT checked
        {
            onegearSim();
        }
    }
    else if (fixedmul.IsChecked == true)
    {
        fixedgearsSim();
    }
    else
    {
        searchBestSim();
    }
}

function searchBestSim()
{
    /*
    //////////////// TA BO NAJBOLJ KOMPLICIRANA
    while (speedGain > 0.0005)//tle not dej speedgain da računa dokler reč še pospešuje
    {
        if (speed > 27.7 && b == false)
        {

            console.log("0-100 time: " + executionTime + "    speed  " + speed * 3.6);
            sw.WriteLine("0-100 time: " + executionTime + "    speed  " + speed * 3.6);
            b = true;
        }

        if (c == false && distance >= 1000.0)
        {
            console.log("1KM  Exc. time: {0:F1}", Math.Round(executionTime / 1000, 1));
            console.log("s  speed: " + Math.Round(speed * 3.6, 2) + "km/h  distance:" + Math.Round(distance, 0) + " m   ");
            sw.Write("1KM  Exc. time: {0:F1}", Math.Round(executionTime / 1000, 2));
            sw.WriteLine("s  speed: " + Math.Round(speed * 3.6, 2) + "km/h  distance:" + Math.Round(distance, 0) + " m   ");
            calculate_interval_ms = calculate_interval_ms * 5;//ponovno na prejšnjo vrednost
            c = true;
        }

        if ((950.0 < distance) && (distance < 1000.0) && (interval == false))
        {
            calculate_interval_ms = calculate_interval_ms / 5;//povečana natančnost da dobimo čas na 1000m
            interval = true;
        }

        step_count++;
        executionTime = executionTime + calculate_interval_ms;
        acceleration = Physics.acceleration_calc(speed, power, weight, cx, rolling_resistance, maxg);
        speedGain = acceleration * calculate_interval_ms;
        speed = speed + speedGain;
        distance = distance + (speed + speedGain / 2) * calculate_interval_ms / 1000;
        //calculateForces();
        //calculateNewData();
        outputData();

    }
    sw.Close();
    System.Diagnostics.Process.Start(desktoppath + @"\accelerationOutput.txt");
    console.log("Max rpm: " + maxrpm);
    Environment.Exit(1);
     * */
}

function fixedgearsSim()
{
    /*
    //gears that are fixed in window frame
    while (speedGain > 0.0005)//tle not dej speedgain da računa dokler reč še pospešuje
    {
        if (speed > 27.7 && b == false)
        {

            console.log("0-100 time: " + executionTime + "    speed  " + speed * 3.6);
            sw.WriteLine("0-100 time: " + executionTime + "    speed  " + speed * 3.6);
            b = true;
        }

        if (c == false && distance >= 1000.0)
        {
            console.log("1KM  Exc. time: {0:F1}", Math.Round(executionTime / 1000, 1));
            console.log("s  speed: " + Math.Round(speed * 3.6, 2) + "km/h  distance:" + Math.Round(distance, 0) + " m   ");
            sw.Write("1KM  Exc. time: {0:F1}", Math.Round(executionTime / 1000, 2));
            sw.WriteLine("s  speed: " + Math.Round(speed * 3.6, 2) + "km/h  distance:" + Math.Round(distance, 0) + " m   ");
            calculate_interval_ms = calculate_interval_ms * 5;//ponovno na prejšnjo vrednost
            c = true;
        }

        if ((950.0 < distance) && (distance < 1000.0) && (interval == false))
        {
            calculate_interval_ms = calculate_interval_ms / 5;//povečana natančnost da dobimo čas na 1000m
            interval = true;
        }

        step_count++;
        executionTime = executionTime + calculate_interval_ms;
        acceleration = Physics.acceleration_calc(speed, power, weight, cx, rolling_resistance, maxg);
        speedGain = acceleration * calculate_interval_ms;
        speed = speed + speedGain;
        distance = distance + (speed + speedGain / 2) * calculate_interval_ms / 1000;
        //calculateForces();
        //calculateNewData();
        outputData();

    }
    sw.Close();
    System.Diagnostics.Process.Start(desktoppath + @"\accelerationOutput.txt");
    console.log("Max rpm: " + maxrpm);
    Environment.Exit(1);
     * */
}

function onegearSim()
{

    if (  (executionTime < 300) && (speed < 5.0))//pozor ker speed je v m/s
    {
        speedGain = maxg * 0.9;//wheelspin na začetku pospeševanja, prve 3 desetinke
    }

    //while (speedGain > 0.0005)//tle not dej speedgain da računa dokler reč še pospešuje
    while( distance < 1609)
    {
        //vprasanje, kaki je interval_ms zdaj
        if ((1578.0 < distance) && (distance < 1709.0) && (interval == false))//to pazi kako postaviš
        {
            calculate_interval_ms = calculate_interval_ms / 10;//povečana natančnost da dobimo čas na 1000m DEFAULT 5
            interval = true;
        }

      /*  if (distance > 1560)//to sem dodal zdaj
        {
            console.log("Exc. time: " + Math.Round(executionTime / 1000, 2) + "s  speed: " + Math.Round(speed * 3.6, 2) + "km/h    speedgain:" + Math.Round(speedGain, 2) + "    distance:" + Math.Round(distance, 0) + " m    power:" + Math.Round(power, 1) + "   rpm:" + currentRpm);
            //console.log("s  speed: " + Math.Round(speed * 3.6, 2) + "km/h  distance:" + Math.Round(distance, 0) + " m   " + "power:" + power);
        }*/

        step_count++;
        executionTime = executionTime + calculate_interval_ms;
        power = calculatePower(speed);
        acceleration = Physics.acceleration_calc(speed, power, weight, cx, rolling_resistance, maxg);
        speedGain = acceleration * calculate_interval_ms;
        speed = speed + speedGain;
        distance = distance + (speed + speedGain / 2) * calculate_interval_ms / 1000;
        //calculateForces();
        //calculateNewData();
        outputData();

    }
   // sw.Close();
  //  sw.Dispose();
  //  System.Diagnostics.Process.Start(desktoppath + @"\accelerationOutput.txt");

    console.log("Max rpm: " + maxrpm);
    //Environment.Exit(1);//to če furam multiple times simulacijo em sm zakomentiral
}

function calculatePower(speed)
{
    if (  (executionTime < 500)  &&  (speed < 5) )
    {
        return 100.0;
    }
    else
    {
        //OKEJ to je narejeno za singlegear
        currentRpm = Math.Round(( speed) / maxgearlength * maxrpm);//speed in tudi maxgearlength so oba v m/s
        //zdaj treba izračuant current power iz tabele tor[]
        ena_celica = maxrpm / (tor.Length - 2);
        visek_rpm = currentRpm % ena_celica;
        celica = (currentRpm / ena_celica);
        //console.log("CELICA -------------" + celica+"    rpm:"+currentRpm);

        if (celica == tor.Length-2)
        {
            //double currentTorque = tor[celica];
            //currentTorque = currentTorque * 0.454 * 3.048;//preveri če prav konvertira v nm
            //double rezultat = currentTorque * currentRpm / 7030;//tale 7000 ni natančen
            //tle bi moral returnat same as before? neee ohranit hitrost mora, če ohrani moč bo nadaljeval pospeševanje
            return 0;
        }
        else
        {
            currentTorque = tor[celica] + (tor[celica+1] - tor[celica]) * (visek_rpm / ena_celica);
           // sw.WriteLine("rpm: " + currentRpm + "       torque: " + Math.Round(currentTorque, 0) + "lb-ft");
            currentTorque = currentTorque * 0.454 * 3.048;//preveri če prav konvertira v nm
            rezultat = currentTorque * currentRpm / 7030;//tale 7000 ni natančen
            return rezultat;
        }
    }
}

function readFile()
{
    console.warn("Torque figures are currently hardcoded, no need to read file")
    // try
    // {
    //     var counter = 0;
    //     var line;

    //     // Read the file and display it line by line.
    //     System.IO.StreamReader file = new System.IO.StreamReader("torque3.txt");
    //     linecount = File.ReadLines("torque3.txt").Count();
    //     tor = new int[linecount];
    //     while ((line = file.ReadLine()) != null)
    //     {
    //         //console.log(line);
    //         tor[counter] = Convert.ToInt32(line);
    //         counter++;
    //     }
    //     maxrpm = tor[counter-1];
    //     file.Close();
    // }
    // catch (e)
    // {
    //     console.error("Error reading file, ", e)
    // }
}

function outputData()
{
    //sw.WriteLine("tralaala outputdata");
    netforce = 0;
    if (b == false)
    {
        //WriteLine("Exc. time: " + Math.Round(executionTime / 1000, 2) + "s  speed: " + Math.Round(speed * 3.6, 2) + "km/h    speedgain:" + Math.Round(speedGain, 2) + "    distance:" + Math.Round(distance, 0) + " m   ");
//        sw.WriteLine("Exc. time: " + Math.Round(executionTime / 1000, 2) + "s  speed: " + Math.Round(speed * 3.6, 2) + "km/h    speedgain:" + Math.Round(speedGain, 2) + "    distance:" + Math.Round(distance, 0) + " m    power:" + Math.Round(power, 1)+"   rpm:"+currentRpm);
        console.log("Exc. time: " + Math.Round(executionTime / 1000, 2) + "s  speed: " + Math.Round(speed * 3.6, 2) + "km/h    speedgain:" + Math.Round(speedGain, 2) + "    distance:" + Math.Round(distance, 0) + " m    power:" + Math.Round(power, 1) + "   rpm:" + currentRpm);
    }
    else
    {
        if (step_count % 2 == 0)//original 10, to je frekvenca izpisa
        {
            console.log("Exc. time: {0:F1}", Math.Round(executionTime / 1000, 1));
          //  sw.Write("Exc. time: {0:F1}", Math.Round(executionTime / 1000, 1));
        //    sw.WriteLine("Exc. time: " + Math.Round(executionTime / 1000, 2) + "s  speed: " + Math.Round(speed * 3.6, 2) + "km/h    speedgain:" + Math.Round(speedGain, 2) + "    distance:" + Math.Round(distance, 0) + " m    power:" + Math.Round(power, 1) + "   rpm:" + currentRpm);
            console.log("Exc. time: " + Math.Round(executionTime / 1000, 2) + "s  speed: " + Math.Round(speed * 3.6, 2) + "km/h    speedgain:" + Math.Round(speedGain, 2) + "    distance:" + Math.Round(distance, 0) + " m    power:" + Math.Round(power, 1) + "   rpm:" + currentRpm);
        }
    }


}

function calculateNewData()
{
    acceleration = netforce / weight;
    if (acceleration > 10)
        acceleration = 10;
    speedGain = calculate_interval_ms * acceleration * 3.6 / 1000;
    distance = distance + (speed + speedGain / 2) * calculate_interval_ms / 3.6;
    speed = speed + speedGain;
}

function calculateForces()
{
    pushforce = power * 3.6 * 900 / speed;  //20 000
    brakeforce = speed * speed * 0.1 + speed * 50; // 4000 + 1500
    netforce = pushforce - brakeforce;
}